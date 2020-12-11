import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_SIGNOUT
} from './userConsts'

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }
    
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }
   
    case USER_SIGNOUT:
      return {}
      
    default:
      return state
  }
}

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload }
    
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
      
    default:
      return state
  }
}

export const userDetailsReducer = (state = { loading: true}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload}
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload}
    default:
      return state
  }
}