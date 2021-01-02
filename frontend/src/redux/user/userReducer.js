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
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_CONFIG_REQUEST,
  USER_UPDATE_CONFIG_SUCCESS,
  USER_UPDATE_CONFIG_FAIL,
  USER_UPDATE_CONFIG_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
  USER_SIGNOUT,
  USER_ADDRESS_MAP_CONFIRM
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
    case USER_DETAILS_RESET:
      return { loading: true }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: action.payload.message }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload}
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: action.payload }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateConfigReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_CONFIG_REQUEST:
      return { loading: true }
    case USER_UPDATE_CONFIG_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_CONFIG_FAIL:
      return { loading: false, error: action.payload}
    case USER_UPDATE_CONFIG_RESET:
      return {}
    default:
      return state
  }
}

export const userTopSellersListReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case USER_TOPSELLERS_LIST_REQUEST:
      return { loading: true }
    case USER_TOPSELLERS_LIST_SUCCESS:
      return { loading: false, success: true, users: action.payload }
    case USER_TOPSELLERS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userAddressMapReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_MAP_CONFIRM:
      return { address: action.payload }
    default:
      return state
  }
}
