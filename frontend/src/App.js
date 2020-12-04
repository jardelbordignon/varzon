import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'

export default function App() {
  return (
    <BrowserRouter>
    <div className='grid-container'>
      <header className='row'>
        <div>
          <a className='bold' href='/'>varzon</a>
        </div>
        <div>
          <a href='/cart'>Carrinho</a>
          <a href='/signin'>Entrar</a>
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
