import { BrowserRouter, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Routes from './pages/_Routes'
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
            <i className="fa fa-shopping-cart"></i>
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
                <li><Link to='/admin/products'>Produtos</Link></li>
                <li><Link to='/admin/orders'>Pedidos</Link></li>
                <li><Link to='/admin/users'>Usuários</Link></li>
              </ul>
            </div>
          }
        </div>
      </header>

      <main>
        <Routes />
      </main>

      <footer className='row center'>
        Feito com <span><i className="fa fa-heart-o"></i></span> por Jardel Bordignon, &copy; 2020 Todos os direitos reservados.
      </footer>
    </div>
    </BrowserRouter>
  )
}
