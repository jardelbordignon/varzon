import { Route } from 'react-router-dom'

import ConditionedRoute from '../components/ConditionedRoute'

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
import Seller from './Seller'
import Search from './Search'

export default function Routes() {
  return (
    <>
      <Route path='/' exact component={Home} />
      <Route path='/s/:id' exact component={Seller} />
      <Route path='/cart/:id?' component={Cart} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/shipping' component={Shipping} />
      <Route path='/payment' component={Payment} />
      <Route path='/placeorder' component={PlaceOrder} />
      <Route path='/order/:id' component={Order} />
      <Route path='/orderHistory' component={OrderHistory} />
      <Route path='/products/:id' component={Product} />
      <Route path='/search/name/:name' exact component={Search} />
      <ConditionedRoute path='/profile' component={Profile} />
      <ConditionedRoute seller path='/admin/productForm/:id?' component={ProductForm} />
      <ConditionedRoute seller path='/seller/products' exact component={ProductList} />
      <ConditionedRoute seller path='/seller/orders' exact component={OrderList} />
      <ConditionedRoute admin path='/admin/products' component={ProductList} />
      <ConditionedRoute admin path='/admin/orders' component={OrderList} />
      <ConditionedRoute admin path='/admin/users' exact component={UserList} />
      <ConditionedRoute admin path='/admin/users/:id/edit' component={UserEdit} />
    </>
  )
}
