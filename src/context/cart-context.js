import React, { useContext, useReducer, useEffect } from 'react'
import reducer from '../reducers/cart-reducer'
import {
  CLEAR_CART,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  COUNT_CART_TOTALS,
} from '../actions'

const CartContext = React.createContext()
const getCartItems = () => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}
const intialState = {
  cart: getCartItems(),
  totalAmount: 0,
  totalItems: 0,
  shippingFees: 534,
}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
