import Axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  //ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from './orderConsts'

import { CART_EMPTY } from '../cart/cartConsts'

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  try {
    const { userSignin: { userInfo } } = getState()
    const { data } = await Axios.post('/orders', order, { 
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    })
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: CART_EMPTY })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const detailsOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
  const { userSignin: { userInfo } } = getState()
  try {
    const order = await Axios.get(`/orders/${orderId}`, { 
      headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: order.data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult }})
  const { userSignin: { userInfo } } = getState()
  try {
    const { data } = Axios.put(`/orders/${order.data.id}/pay`, paymentResult, {
      headers: { Authorization: 'Bearer ' +userInfo.token}
    })
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST })
  const { userSignin: { userInfo } } = getState()
  try {
    const { data } = await Axios.get(`/orders/mine`, { 
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    })
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST })
  const { userSignin: { userInfo } } = getState()
  try {
    const { data } = await Axios.get(`/orders`, { 
      headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const deleteOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST })
  const { userSignin: { userInfo } } = getState()
  try {
    const { data } = await Axios.delete(`/orders/`+orderId, { 
      headers: { Authorization: 'Bearer ' + userInfo.token }
    })
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const deliverOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId })
  const { userSignin: { userInfo } } = getState()
  try {
    const { data } = Axios.put(`/orders/${orderId}/deliver`, {}, {
      headers: { Authorization: 'Bearer ' +userInfo.token}
    })
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELIVER_FAIL, payload: error.response?.data.message || error.message })
  }
}