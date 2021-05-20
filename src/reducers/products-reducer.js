import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  LIST_PRODUCTS_BY_SHOP_SUCCESS,
  LIST_PRODUCTS_BY_SHOP_ERROR,
  DELETE_PORODUCT_SUCCESS,
  DELETE_PORODUCT_ERROR,
} from './../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }

  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  if (action.type == GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true }
  }

  if (action.type == GET_PRODUCTS_SUCCESS) {
    const featuredProducts = action.payload.filter(
      (product) => product.featured == true
    )
    return {
      ...state,
      products: action.payload,
      featuredProducts,
      productsLoading: false,
    }
  }

  if (action.type == GET_PRODUCTS_ERROR) {
    return {
      ...state,
      productsError: true,
      productsLoading: false,
    }
  }

  if (action.type == GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, singleProductLoading: true, singleProductError: false }
  }

  if (action.type == GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProductLoading: false,
      singleProductError: false,
      singleProduct: action.payload,
    }
  }

  if (action.type == GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, singleProductLoading: false, singleProductError: true }
  }

  if (action.type == LIST_PRODUCTS_BY_SHOP_SUCCESS) {
    return {
      ...state,
      productsByShop: action.payload,
    }
  }

  if (action.type == LIST_PRODUCTS_BY_SHOP_ERROR) {
    return {
      ...state,
      productsByShopError: true,
    }
  }

  if (action.type === DELETE_PORODUCT_SUCCESS) {
    const id = action.payload
    const tempProducts = state.productsByShop.filter(
      (product) => product._id !== id
    )
    return { ...state, myShops: tempProducts }
  }

  if (action.type === DELETE_PORODUCT_ERROR) {
    return { ...state, error: action.payload.error }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default products_reducer
