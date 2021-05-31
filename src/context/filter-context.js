import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { useProductsContext } from './products-context'
import reducer from './../reducers/filter-reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
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

const intialState = {
  filteredProducts: [],
  allProducts: [],
  categories: [],
  colors: [],
  companies: [],
  gridView: true,
  sort: 'price-lowest',
  filters: {
    maxPrice: 0,
    minPrice: 0,
    price: 0,
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    shipping: false,
  },
}
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products, fetchProducts } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
    getCategories()
    getColors()
    getCompanies()
  }, [products])

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
    // dispatch({ type: FILTER_PRODUCTS })
  }, [products, state.sort, state.filters])

  const setGirdView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e) => {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  //filters
  const updateFilters = async (e) => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
    fetchProducts(name, value)
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const getCategories = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/api/products/categories`
      )
      console.log(res)
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_CATEGORIES_ERROR, payload: err.res.data })
    }
  }

  const getColors = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/api/products/colors`
      )
      dispatch({ type: GET_COLORS_SUCCESS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_COLORS_ERROR, payload: err.res.data })
    }
  }

  const getCompanies = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/api/products/company`
      )
      dispatch({ type: GET_COMPANIES_SUCCESS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_COMPANIES_ERROR, payload: err.res.data })
    }
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGirdView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
