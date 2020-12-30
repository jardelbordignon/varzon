import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { 
  productDetailsReducer, 
  productListReducer, 
  productCreateReducer, 
  productUpdateReducer, 
  productDeleteReducer, 
} from './product/productReducer'

import { 
  categoryListReducer,
} from './category/categoryReducer'

import { cartReducer } from './cart/cartReducer'

import { 
  userDeleteReducer,
  userDetailsReducer, 
  userListReducer, 
  userSigninReducer, 
  userSignupReducer, 
  userTopSellersListReducer, 
  userUpdateConfigReducer, 
  userUpdateProfileReducer
} from './user/userReducer'

import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderListReducer, 
  orderMineListReducer, 
  orderPayReducer, 
  orderDeleteReducer,
  orderDeliverReducer
} from './order/orderReducer'

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
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdateConfig: userUpdateConfigReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userTopSellersList: userTopSellersListReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
)

export default store