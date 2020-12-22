import { Route } from 'react-router-dom'

import LoggedRoute from '../components/LoggedRoute'

import Home from './Home'
import Product from './Product'
import Cart from './Cart'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Shipping from './Shipping'
import Payment from './Payment'
import PlaceOrder from './PlaceOrder'
import Order from './Order'
import OrderHistory from './OrderHistory'
import Profile from './Profile'
import ProductList from './admin/ProductList'
import ProductForm from './admin/ProductForm'

export default function Routes() {
  return (
    <>
      <Route path='/' exact component={Home} />
      <Route path='/cart/:id?' component={Cart} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/shipping' component={Shipping} />
      <Route path='/payment' component={Payment} />
      <Route path='/placeorder' component={PlaceOrder} />
      <Route path='/order/:id' component={Order} />
      <Route path='/orderHistory' component={OrderHistory} />
      <LoggedRoute path='/profile' component={Profile} />
      <Route path='/admin/productForm/:id?' component={ProductForm} />
      <LoggedRoute onlyAdmin path='/admin/products' component={ProductList} />
      <Route path='/products/:id' component={Product} />
    </>
  )
}
