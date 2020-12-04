import { BrowserRouter, Link, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'

export default function App() {
  const { cartItems } = useSelector( state => state.cart )

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
          <Link to='/signin'>Entrar</Link>
        </div>
      </header>

      <main>
        <Route path='/' exact component={Home} />
        <Route path='/product/:id' component={Product} />
        <Route path='/cart/:id?' component={Cart} />
      </main>

      <footer className='row center'>
        Feito com <span><i className="fa fa-heart-o"></i></span> por Jardel Bordignon, &copy; 2020 Todos os direitos reservados.
      </footer>
    </div>
    </BrowserRouter>
  )
}
