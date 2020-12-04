import { CART_ADD_ITEM } from './cartConsts'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(cartItem => cartItem.productId === item.productId)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem => (
            cartItem.productId === existItem.productId ? item : cartItem
          ))
        }
      } else {
        return {...state, cartItems: [...state.cartItems, item]} 
      }
    
    default:
      return state
  }
}