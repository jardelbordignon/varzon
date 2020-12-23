import Axios from 'axios'

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
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
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
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const signin = ({email, password}) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
  try {
    const { data } = await Axios.post('/users/signin', { email, password })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  dispatch({ type: USER_SIGNOUT })
}

export const detailsUser = userId => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.get(`/users/${userId}`, {
      headers: { Authorization: 'Bearer ' + userInfo.token}
    })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response?.data.message || error.message })   
  }
}

export const updateUserProfile = user => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.put('/users/profile', user, {
      headers: { Authorization: 'Bearer ' + userInfo.token}
    })
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.get('/users', {
      headers: { Authorization: 'Bearer ' + userInfo.token}
    })
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.response?.data.message || error.message })
  }
}
