import Axios from 'axios'

import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM, 
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL
} from './cartConsts'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data : product } = await Axios.get(`/products/${productId}`)
  const { cart: { cartItems} } = getState()
  
  if ( !!cartItems.length && product.seller.id !== cartItems[0].sellerId ) {
    dispatch({ 
      type: CART_ADD_ITEM_FAIL, 
      payload: `Compre de um vendedor de cada vez, finalize compra com ${product.seller.name}` })
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: { 
        name: product.name,
        imageUrl: product.images[0].url,
        price: product.price,
        countInStock: product.countInStock,
        productId: product.id,
        qty,
        sellerId: product.seller.id
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const removeFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
}