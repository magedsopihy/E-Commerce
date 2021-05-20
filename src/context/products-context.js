import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import reducer from './../reducers/products-reducer'

import { products_url as url } from './../utils/constants'
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
  LIST_PRODUCTS_BY_SHOP_SUCCESS,
  LIST_PRODUCTS_BY_SHOP_ERROR,
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
  const { user } = useUserContext()
  //sidebar
  const authAxios = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { Authorization: `Bearer ${user.token}` },
  })

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
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
    const { images, name, description, category, quantity, price } = values
    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    category && shopData.append('category', category)
    quantity && shopData.append('quantity', quantity)
    price && shopData.append('price', price)
    console.log(images)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        // shopData.append(images[i].name, images[i])
        shopData.append('image', images[i])
      }
    }

    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:3001/api/products/by/${shopId}`,
        data: shopData,
        headers: { Authorization: `Bearer ${user.token}` },
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const fechProductsByShop = async (id) => {
    try {
      const response = await authAxios.get(`/products/by/${id}`)
      // dispatch({ type: LIST_PRODUCTS_BY_SHOP_SUCCESS, payload: response.data })
      return response.data
    } catch (err) {
      // dispatch({
      //   type: LIST_PRODUCTS_BY_SHOP_ERROR,
      //   payload: err.response.data,
      // })
      // return err.response.data
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
