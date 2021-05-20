import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
  SET_USER,
} from './../actions'

const user_reducer = (state, action) => {
  if (action.type === LOGIN_SUCCESS) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(action.payload))
    }

    return {
      ...state,
      user: action.payload,
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
    return { ...state, error: '', user: [] }
  }
  throw new Error(`No matching ${action.type} - action type`)
}

export default user_reducer
