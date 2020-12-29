import { BrowserRouter, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Routes from './pages/_Routes'
import { signout } from './redux/user/userActions'
import LinkUnlessCurrent from './components/LinkUnlessCurrent'
import SearchBox from './components/SearchBox'

export default function App() {
  const { cartItems } = useSelector( state => state.cart )
  const { userInfo } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()

  function signoutHandler() {
    if (window.confirm('Obrigado pela visita, espero que volte logo!\nDeseja mesmo sair?'))
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
          <Route render={({history}) => <SearchBox history={history} /> } />
        </div>
        <div>
          { !!cartItems.length &&
            <Link to='/cart'>
              <i className="fa fa-shopping-cart"></i>
              <span className='badge'>{ cartItems.length }</span>
            </Link>
          }
          { userInfo 
            ? (
              <div className="dropdown">
                <Link to='#'>
                  { userInfo.name } <i className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <li><Link to='/profile'><i className='fa fa-user'/> Meus Perfil {!!userInfo.token ? 'S':'N'}</Link></li>
                  <li><Link to='/orderHistory'><i className='fa fa-truck'/> Meus Pedidos</Link></li>
                  <li><Link to='#' onClick={signoutHandler}><i className='fa fa-sign-out'/> Sair</Link></li>
                </ul>
              </div>
            )
            : <LinkUnlessCurrent to='/signin'>Entrar</LinkUnlessCurrent>
          }
          { userInfo?.isSeller &&
            <div className="dropdown">
              <Link to='#'>
                Minha Loja <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li><Link to='/seller/products'><i className='fa fa-cog'/> Produtos</Link></li>
                <li><Link to='/seller/orders'><i className='fa fa-truck'/> Pedidos</Link></li>
              </ul>
            </div>
          }
          { userInfo?.isAdmin &&            
            <div className="dropdown">
              <Link to='#'>
                Admin <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li><Link to='/dashboard'><i className='fa fa-cog'/> Configurações</Link></li>
                <li><Link to='/admin/products'><i className='fa fa-shopping-cart'/> Produtos</Link></li>
                <li><Link to='/admin/orders'><i className='fa fa-truck'/> Pedidos</Link></li>
                <li><Link to='/admin/users'><i className='fa fa-users'/> Usuários</Link></li>
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
