import {data} from './data'
import Product from './components/Product'

export default function App() {
  return (
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
        <div className='row center'>
          { data.products.map(product => <Product key={product._id} product={product} />) }
        </div>
      </main>

      <footer className='row center'>
        Feito com <span><i className="fa fa-heart-o"></i></span> por Jardel Bordignon, &copy; 2020 Todos os direitos reservados.
      </footer>
    </div>
  )
}
