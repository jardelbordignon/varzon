import Axios from 'axios'

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS
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
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.message || error.message })
  }
}