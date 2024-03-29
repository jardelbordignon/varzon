import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { 
  productDetailsReducer, 
  productListReducer, 
  productCreateReducer, 
  productUpdateReducer, 
  productDeleteReducer,
  productReviewCreateReducer, 
} from './product/productReducer'

import { 
  categoryListReducer,
} from './category/categoryReducer'

import { cartReducer } from './cart/cartReducer'

import { 
  userAddressMapReducer,
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

const shippingAddressInitialState = {
  fullName:'',
  street:'',
  number:'',
  complement:'',
  neighborhood:'',
  city:'',
  state:'',
  country:'',
  postalCode:'',
  lat:0,
  lng:0
}

const initialState = {
  userSignin: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || false
  },
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || shippingAddressInitialState,
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
  productReviewCreate: productReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
)

export default store