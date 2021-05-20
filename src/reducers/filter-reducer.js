import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
} from './../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const allPrices = action.payload.map((product) => product.price)
    const maxPrice = Math.max(...allPrices)

    return {
      ...state,
      filteredProducts: [...action.payload],
      allProducts: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice,
        price: maxPrice,
      },
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true }
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state
    let temp = [...filteredProducts]
    if (sort === 'price-lowest') {
      temp = filteredProducts.sort((a, b) => a.price - b.price)
      return { ...state, filteredProducts: temp }
    }
    if (sort === 'price-highest') {
      temp = filteredProducts.sort((a, b) => b.price - a.price)
      return { ...state, filteredProducts: temp }
    }
    if (sort === 'name-a') {
      temp = filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      return { ...state, filteredProducts: temp }
    }
    if (sort === 'name-z') {
      temp = filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      return { ...state, filteredProducts: temp }
    }
  }

  //filters actions
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state
    let tempProducts = [...allProducts]
    const { price, text, company, category, color, shipping } = state.filters

    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category
      })
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company
      })
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true
      })
    }

    if (price) {
      tempProducts = tempProducts.filter((product) => {
        return product.price <= price
      })
    }
    return { ...state, filteredProducts: tempProducts }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        price: state.filters.maxPrice,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        shipping: false,
      },
    }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default filter_reducer
