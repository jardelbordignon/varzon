import { BrowserRouter, Link, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
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
                  <Link to='#' onClick={signoutHandler}>Sair</Link>
                </ul>
              </div>            
            )
            : <Link to='/signin'>Entrar</Link>
          }
        </div>
      </header>

      <main>
        <Route path='/' exact component={Home} />
        <Route path='/product/:id' component={Product} />
        <Route path='/cart/:id?' component={Cart} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </main>

      <footer className='row center'>
        Feito com <span><i className="fa fa-heart-o"></i></span> por Jardel Bordignon, &copy; 2020 Todos os direitos reservados.
      </footer>
    </div>
    </BrowserRouter>
  )
}
