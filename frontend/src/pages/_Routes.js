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
import OrderList from './admin/OrderList'
import UserList from './admin/UserList'
import UserEdit from './admin/UserEdit'

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
      <Route path='/admin/productForm/:id?' component={ProductForm} />
      <Route path='/products/:id' component={Product} />
      <LoggedRoute path='/profile' component={Profile} />
      <LoggedRoute onlyAdmin path='/admin/products' component={ProductList} />
      <LoggedRoute onlyAdmin path='/admin/orders' component={OrderList} />
      <LoggedRoute onlyAdmin path='/admin/users' exact component={UserList} />
      <LoggedRoute onlyAdmin path='/admin/users/:id/edit' component={UserEdit} />
    </>
  )
}
