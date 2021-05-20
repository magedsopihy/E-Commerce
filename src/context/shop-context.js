import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import reducer from './../reducers/shop-reducer'
import { useUserContext } from './user-context'
import { shop_url as url } from './../utils/constants'
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
  const { user } = useUserContext()
  const [state, dispatch] = useReducer(reducer, intialState)

  //base axios
  const authAxios = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { Authorization: `Bearer ${user.token}` },
  })

  const createShop = async ({ name, description, image }) => {
    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    image && shopData.append('image', image)

    try {
      const response = await axios({
        method: 'post',
        url: `http://localhost:3001/api/shops/by/${user.user._id}`,
        data: shopData,
        headers: { Authorization: `Bearer ${user.token}` },
      })
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const listShopsByOwner = async () => {
    try {
      const response = await authAxios.get(`/shops/by/${user.user._id}`)
      dispatch({ type: LIST_SHOPS_BY_OWNER_SUCCESS, payload: response.data })
    } catch (err) {
      dispatch({ type: LIST_SHOPS_BY_OWNER_ERROR, payload: err.response.data })
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

  const readShop = async (id) => {
    try {
      const response = await authAxios.get(`/shop/${id}`)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const updateShop = async ({ id, name, description, image }) => {
    let shopData = new FormData()
    name && shopData.append('name', name)
    description && shopData.append('description', description)
    image && shopData.append('image', image)

    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:3001/api/shops/${id}`,
        data: shopData,
        headers: { Authorization: `Bearer ${user.token}` },
      })

      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const listAllShops = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/shops')
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
