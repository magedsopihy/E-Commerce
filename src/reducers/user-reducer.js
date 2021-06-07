import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
  PROFILE_EDIT_SUCCESS,
  PROFILE_EDIT_ERROR,
  SET_USER,
} from './../actions'

const user_reducer = (state, action) => {
  if (action.type === SET_USER) {
    if (localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'))
      return {
        ...state,
        isAuthenticated: true,
        token: auth.token,
        authorizedId: auth.user._id,
        seller: auth.user.seller,
        error: '',
      }
    }
    return {
      ...state,
    }
  }

  if (action.type === LOGIN_SUCCESS) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(action.payload))
    }

    return {
      ...state,
      isAuthenticated: true,
      token: action.payload.token,
      authorizedId: action.payload.user._id,
      seller: action.payload.user.seller,
      error: '',
      redirectToReferrer: true,
    }
  }

  if (action.type === LOGIN_ERROR) {
    return { ...state, error: action.payload.error }
  }

  if (action.type === SIGNUP_SUCCESS) {
    return { ...state, error: '', openModal: true }
  }
  if (action.type === SIGNUP_ERROR) {
    return { ...state, error: action.payload.error, openModal: false }
  }

  if (action.type === LOGOUT) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt')
    }
    return {
      ...state,
      error: '',
      isAuthenticated: false,
      token: '',
      authorizedId: '',
      seller: false,
      redirectToReferrer: false,
    }
  }

  if (action.type === PROFILE_EDIT_SUCCESS) {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jwt')) {
        let auth = JSON.parse(localStorage.getItem('jwt'))
        auth.user = action.payload
        localStorage.setItem('jwt', JSON.stringify(auth))
        return {
          ...state,
          error: '',
          seller: action.payload.seller,
          isAuthenticated: true,
          redirectAfterEditUserProfile: true,
        }
      }
    }
  }

  if (action.type === PROFILE_EDIT_ERROR) {
    return { ...state, error: action.payload.error }
  }

  throw new Error(`No matching ${action.type} - action type`)
}

export default user_reducer
