import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from './cartConsts'

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

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.productId !== action.payload)
      }
    
    case CART_SAVE_SHIPPING_ADDRESS:
      return {...state, shippingAddress: action.payload}
    
    case CART_SAVE_PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload}
    
    default:
      return state
  }
}