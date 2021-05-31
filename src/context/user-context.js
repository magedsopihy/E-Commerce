import React, { useContext, useReducer, useEffect, useMemo } from 'react'
import axios from 'axios'
import reducer from './../reducers/user-reducer'

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_ERROR,
  SET_USER,
} from './../actions'

const intialState = {
  isAuthenticated: false,
  token: '',
  authorizedId: '',
  seller: false,
  redirectToReferrer: false,
  redirectAfterEditUserProfile: false,
  error: '',
  openModal: false,
}

//base axios

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api',
    headers: { Authorization: `Bearer ${state.token}` },
  })

  useMemo(() => {
    dispatch({ type: SET_USER })
  }, [state.isAuthenticated])

  //track user inputs
  const login = async (user) => {
    try {
      let response = await axios.post(
        process.env.REACT_APP_API_URL + '/auth/signin/',
        user
      )
      console.log(response)
      dispatch({ type: LOGIN_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: LOGIN_ERROR, payload: err.response.data })
    }
  }

  //signup
  const signup = async (user) => {
    console.log(user)
    try {
      let response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/users/',
        user
      )
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err.response.data)
      console.log(err)
      dispatch({ type: SIGNUP_ERROR, payload: err.response.data })
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
  }

  const readUserProfile = async (id) => {
    try {
      const response = await authAxios.get(`/users/${id}`)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }

  const editUserProfile = async (user, userId) => {
    try {
      let response = await authAxios.put(`/users/${userId}`, user)
      console.log(response)
      dispatch({ type: PROFILE_EDIT_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err.response.data)
      dispatch({ type: PROFILE_EDIT_ERROR, payload: err.response.data })
    }
  }
  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        readUserProfile,
        editUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
