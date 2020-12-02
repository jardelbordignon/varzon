import { Link } from 'react-router-dom'

import {data} from '../data'
import Rating from '../components/Rating'
import formatValue from '../utils/formatValue'

export default function Product(props) {
  const product = data.products.find(product => product._id === props.match.params.id)

  if (!product)
    return <div>Produto não encontrado</div>

  const {image, name, rating, numReviews, price, description, countInStock} = product

  return (
    <div>
      <Link to='/'>Voltar</Link>
      <div className='row top'>
        <div className="col-2">
          <img className='large' src={image} alt={name} />
        </div>
        <div className="col-1">
          <ul>
            <li><h1>{name}</h1></li>
            <li><Rating rating={rating} numReviews={numReviews} /></li>
            <li>Valor: {formatValue(price)}</li>
            <li>Descrição: {description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Valor</div>
                  <div className="price">{formatValue(price)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div className={countInStock > 0 ? 'success' : 'error'}>
                    { countInStock > 0 ? 'Em Estoque' : 'Indisponível' }
                  </div>
                </div>
              </li>
              <li>
                { countInStock
                  ? <button className="primary block">Adicionar ao carrinho</button>
                  : <button className="primary block">Me avise quando chegar</button>
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
