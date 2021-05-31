import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_COLORS_SUCCESS,
  GET_COLORS_ERROR,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_ERROR,
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

  if (action.type === GET_CATEGORIES_SUCCESS) {
    const distinctCategories = ['all', action.payload].flat()
    return { ...state, categories: distinctCategories }
  }
  if (action.type === GET_CATEGORIES_ERROR) {
    return { ...state }
  }

  if (action.type === GET_COLORS_SUCCESS) {
    const distinctColors = ['all', action.payload].flat()
    return { ...state, colors: distinctColors }
  }
  if (action.type === GET_COLORS_ERROR) {
    return { ...state }
  }
  if (action.type === GET_COMPANIES_SUCCESS) {
    const distinctColors = ['all', action.payload].flat()
    return { ...state, companies: distinctColors }
  }
  if (action.type === GET_COMPANIES_ERROR) {
    return { ...state }
  }
  throw new Error(`No matching ${action.type} - action type`)
}

export default filter_reducer
