import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import reducer from './../reducers/user-reducer'
import { signin_url as url } from './../utils/constants'
import { signup_url } from './../utils/constants'
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
} from './../actions'

const getUser = () => {
  const user = localStorage.getItem('jwt')
  if (user) {
    return JSON.parse(user)
  } else {
    return false
  }
}
const intialState = {
  user: getUser(),
  redirectToReferrer: false,
  error: '',
  openModal: false,
}

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  //track user inputs
  const login = async (user) => {
    try {
      let response = await axios.post(url, user)
      dispatch({ type: LOGIN_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err.response.data)
      dispatch({ type: LOGIN_ERROR, payload: err.response.data })
    }
  }

  //signup
  const signup = async (user) => {
    console.log(user)
    try {
      let response = await axios.post(signup_url, user)
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data })
    } catch (err) {
      console.log(err.response.data)
      dispatch({ type: SIGNUP_ERROR, payload: err.response.data })
    }
  }

  const logout = () => {
    dispatch({ type: LOGOUT })
  }

  return (
    <UserContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
