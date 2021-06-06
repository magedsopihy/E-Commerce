import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import reducer from './../reducers/products-reducer'
import { useUserContext } from './user-context'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  DELETE_PORODUCT_SUCCESS,
  DELETE_PORODUCT_ERROR,
} from './../actions'

const intialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  productsByShop: [],
  productsByShopError: false,
  featuredProducts: [],
  singleProduct: {},
  singleProductLoading: false,
  singleProductError: false,
}
const ProductsContext = React.createContext()
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)
  const { token } = useUserContext()
  //sidebar
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api',
    headers: { Authorization: `Bearer ${token}` },
  })

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async (name = '', value = '') => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/products',
        {
          params: { [name]: value },
        }
      )
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (err) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const product = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product })
    } catch (err) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  const addProduct = async (shopId, values) => {
    const {
      images,
      name,
      description,
      category,
      quantity,
      price,
      colors,
      shipping,
      company,
    } = values

    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    category && shopData.append('category', category)
    quantity && shopData.append('quantity', quantity)
    price && shopData.append('price', price)
    colors && shopData.append('colors', JSON.stringify(colors))
    shipping && shopData.append('shipping', shipping)
    company && shopData.append('company', company)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        shopData.append('image', images[i])
      }
    }

    try {
      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + `/api/products/by/${shopId}`,
        data: shopData,
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const fechProductsByShop = async (id, name = '', value = '', token) => {
    try {
      const response = await authAxios.get(`/products/by/${id}`, {
        params: { [name]: value },
        cancelToken: token,
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const deleteProduct = async (shopId, productId) => {
    try {
      const response = await authAxios.delete(`/product/${shopId}/${productId}`)

      dispatch({ type: DELETE_PORODUCT_SUCCESS, payload: productId })
    } catch (err) {
      console.log(err)
      dispatch({ type: DELETE_PORODUCT_ERROR, payload: err.response.data })
    }
  }

  const fetchProduct = async (id, token) => {
    try {
      const product = await axios.get(
        process.env.REACT_APP_API_URL + `/api/products/${id}`,
        {
          cancelToken: token,
        }
      )
      return product.data
    } catch (err) {
      return err.product.data
    }
  }

  const updateProduct = async (shopId, productId, values) => {
    const {
      imagesToPerview,
      name,
      description,
      images,
      category,
      quantity,
      price,
    } = values

    let prodcutData = new FormData()
    name && prodcutData.append('name', name)
    description && prodcutData.append('description', description)
    category && prodcutData.append('category', category)
    quantity && prodcutData.append('quantity', quantity)
    price && prodcutData.append('price', price)

    if (imagesToPerview.length > 0) {
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          prodcutData.append('image', images[i])
        }
      }
    }
    for (var value of prodcutData.values()) {
      console.log(value)
    }
    try {
      const response = await axios({
        method: 'put',
        url:
          process.env.REACT_APP_API_URL + `/api/product/${shopId}/${productId}`,
        data: prodcutData,
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        addProduct,
        fechProductsByShop,
        deleteProduct,
        fetchProduct,
        updateProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider')
  }
  return context
}
