import Axios from 'axios'

import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
} from './productConsts'

export const listProducts = (
    {page='', sellerId='', name='', category='', min=0, max=0, order=''}
  ) => async dispatch => {
  dispatch({ type: PRODUCT_LIST_REQUEST })
  try {
    const { data } = await Axios.get(
      `/products?page=${page}&sellerId=${sellerId}&name=${name}&category=${category}&min=${min}&max=${max}&order=${order}`
    )
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

export const detailsProduct = productId => async dispatch => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
  try {
    const { data } = await Axios.get(`/products/${productId}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response?.data.message || error.message })
  }
}


export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.post(
      '/products',
      {},
      {headers: { Authorization: 'Bearer ' + userInfo.token }}
    )
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.put('/products', product,
      {headers: { Authorization: 'Bearer ' + userInfo.token }}
    )
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.response?.data.message || error.message })
  }
}


export const deleteProduct = productId => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.delete('/products/'+productId,
      {headers: { Authorization: 'Bearer ' + userInfo.token }}
    )
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response?.data.message || error.message })
  }
}

export const createReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST })
  const { userSignin: { userInfo }} = getState()
  try {
    const { data } = await Axios.post(
      `/products/${productId}/reviews`,
      review,
      {headers: { Authorization: 'Bearer ' + userInfo.token }}
    )
    dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review })
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: error.response?.data.message || error.message })
  }
}
