import {
  LIST_SHOPS_BY_OWNER_ERROR,
  LIST_SHOPS_BY_OWNER_SUCCESS,
  DELETE_SHOP_SUCCESS,
  DELETE_SHOP_ERROR,
} from './../actions'

const shop_reducer = (state, action) => {
  if (action.type === LIST_SHOPS_BY_OWNER_SUCCESS) {
    return { ...state, myShops: action.payload }
  }

  if (action.type === LIST_SHOPS_BY_OWNER_ERROR) {
    return { ...state, error: action.payload.error }
  }

  if (action.type === DELETE_SHOP_SUCCESS) {
    const id = action.payload
    const tempMyShops = state.myShops.filter((shop) => shop._id !== id)
    return { ...state, myShops: tempMyShops }
  }

  if (action.type === DELETE_SHOP_ERROR) {
    return { ...state, error: action.payload.error }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default shop_reducer
