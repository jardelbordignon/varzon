import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { productDetailsReducer, productListReducer, productCreateReducer, productUpdateReducer, productDeleteReducer } from './product/productReducer'
import { cartReducer } from './cart/cartReducer'
import { userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './user/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './order/orderReducer'

const shippingAddressClean = {
  fullName:'', street:'', number:'', complement:'', neighborhood:'', city:'', state:'', country:'', postalCode:''
}

const initialState = {
  userSignin: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || false
  },
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || shippingAddressClean,
    paymentMethod: null //'PayPal'
  }
}

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  orderList: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
)

export default store