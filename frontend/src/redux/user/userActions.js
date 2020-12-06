import Axios from 'axios'

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNOUT
} from './userConsts'

export const signup = ({name, email, password}) => async dispatch => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } })
  try {
    const { data } = await Axios.post('/users/signup', { name, email, password })
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response.data.message || error.message })
  }
}

export const signin = ({email, password}) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message || error.message })
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  dispatch({ type: USER_SIGNOUT })
}