import { BrowserRouter, Link, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import { signout } from './redux/user/userActions'

export default function App() {
  const { cartItems } = useSelector( state => state.cart )
  const { userInfo } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()

  function signoutHandler() {
    dispatch(signout())
  }

  return (
    <BrowserRouter>
    <div className='grid-container'>
      <header className='row'>
        <div>
          <Link to='/' className='bold'>varzon</Link>
        </div>
        <div>
          <Link to='/cart'>
            Carrinho
            { !!cartItems.length &&
              <span className='badge'>{ cartItems.length }</span>
            }
          </Link>
          { userInfo 
            ? (
              <div className="dropdown">
                <Link to='#'>
                  { userInfo.name } <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <li><Link to='/profile'>Meus Perfil</Link></li>
                  <li><Link to='/orderHistory'>Meus Pedidos</Link></li>
                  <li><Link to='#' onClick={signoutHandler}>Sair</Link></li>
                </ul>
              </div>            
            )
            : <Link to='/signin'>Entrar</Link>
          }
          { userInfo && userInfo.isAdmin &&            
            <div className="dropdown">
              <Link to='#'>
                Admin <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li><Link to='/dashboard'>Configurações</Link></li>
                <li><Link to='/productList'>Produtos</Link></li>
                <li><Link to='/orderList'>Pedidos</Link></li>
                <li><Link to='/userList'>Usuários</Link></li>
              </ul>
            </div>
          }
        </div>
      </header>

      <main>
        <Route path='/' exact component={Home} />
        <Route path='/product/:id' component={Product} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/shipping' component={Shipping} />
        <Route path='/payment' component={Payment} />
        <Route path='/placeorder' component={PlaceOrder} />
        <Route path='/order/:id' component={Order} />
        <Route path='/orderHistory' component={OrderHistory} />
        <PrivateRoute path='/profile' component={Profile} />
      </main>

      <footer className='row center'>
        Feito com <span><i className="fa fa-heart-o"></i></span> por Jardel Bordignon, &copy; 2020 Todos os direitos reservados.
      </footer>
    </div>
    </BrowserRouter>
  )
}
