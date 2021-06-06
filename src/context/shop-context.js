import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './../reducers/shop-reducer'
import { useUserContext } from './user-context'

import {
  LIST_SHOPS_BY_OWNER_SUCCESS,
  LIST_SHOPS_BY_OWNER_ERROR,
  DELETE_SHOP_SUCCESS,
  DELETE_SHOP_ERROR,
} from './../actions'

const intialState = {
  myShops: [],
}

const ShopContext = React.createContext()

export const ShopProvider = ({ children }) => {
  const { token, authorizedId } = useUserContext()
  const [state, dispatch] = useReducer(reducer, intialState)

  //base axios
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api',
    headers: { Authorization: `Bearer ${token}` },
  })

  const createShop = async ({ name, description, image }) => {
    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    image && shopData.append('image', image)

    try {
      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_URL + `/api/shops/by/${authorizedId}`,
        data: shopData,
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const listShopsByOwner = async (token) => {
    try {
      const response = await authAxios.get(`/shops/by/${authorizedId}`, {
        cancelToken: token,
      })
      console.log(response)
      dispatch({ type: LIST_SHOPS_BY_OWNER_SUCCESS, payload: response.data })
    } catch (err) {
      // dispatch({ type: LIST_SHOPS_BY_OWNER_ERROR, payload: err.response.data })
    }
  }

  const deleteShop = async (id) => {
    try {
      const response = await authAxios.delete(`/shops/${id}`)
      dispatch({ type: DELETE_SHOP_SUCCESS, payload: id })
    } catch (err) {
      console.log(err)
      dispatch({ type: DELETE_SHOP_ERROR, payload: err.response.data })
    }
  }

  const readShop = async (id, token) => {
    try {
      const response = await authAxios.get(`/shop/${id}`, {
        cancelToken: token,
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const updateShop = async (id, name, description, image) => {
    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    image && shopData.append('image', image)

    try {
      const response = await axios({
        method: 'put',
        url: process.env.REACT_APP_API_URL + `/api/shops/${id}`,
        data: shopData,
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const listAllShops = async (token) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/shops',
        {
          cancelToken: token,
        }
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  return (
    <ShopContext.Provider
      value={{
        ...state,
        createShop,
        listShopsByOwner,
        deleteShop,
        readShop,
        updateShop,
        listAllShops,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShopContext = () => {
  return useContext(ShopContext)
}
