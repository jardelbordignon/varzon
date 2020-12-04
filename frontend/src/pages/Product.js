import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { detailsProduct } from '../redux/product/productActions'
import Rating from '../components/Rating'
import formatValue from '../utils/formatValue'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Product(props) {
  const dispatch = useDispatch()
  const productDetails = useSelector( state => state.productDetails )
  const { loading, error, product } = productDetails
  const productId = props.match.params.id

  useEffect(() => dispatch(detailsProduct(productId)), [productId])

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>

  if (!product)
    return <div>Produto não encontrado</div>

  const {images, name, rating, numReviews, price, description, countInStock} = product

  return (
    <div>
      <Link to='/'>Voltar</Link>
      <div className='row top'>
        <div className="col-2">
          <img className='large' src={images[0].url} alt={name} />
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
                  <div className={countInStock ? 'success' : 'danger'}>
                    { countInStock ? 'Em Estoque' : 'Indisponível' }
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
