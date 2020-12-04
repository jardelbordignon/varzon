import Axios from 'axios'

import { CART_ADD_ITEM } from './cartConsts'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data : product } = await Axios.get(`/products/${productId}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: { 
      name: product.name,
      imageUrl: product.images[0].url,
      price: product.price,
      countInStock: product.countInStock,
      productId: product.id,
      qty
    }
  })
  // persistindo os itens do carrinho no localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}