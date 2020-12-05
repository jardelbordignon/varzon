import { applyMiddleware, createStore, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { productDetailsReducer, productListReducer } from './product/productReducer'
import { cartReducer } from './cart/cartReducer'
import { userSigninReducer, userSignupReducer } from './user/userReducer'

const initialState = {
  userSignin: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || false
  },
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
  }
}

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
)

export default store