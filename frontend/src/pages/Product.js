import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { detailsProduct } from '../redux/product/productActions'
import Rating from '../components/Rating'
import formatValue from '../utils/formatValue'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Product(props) {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector( state => state.productDetails )
  const { loading, error, product } = productDetails
  const productId = props.match.params.id

  useEffect(() => dispatch(detailsProduct(productId)), [dispatch, productId])

  function handleAddToCart() {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  }

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
              { countInStock
              ? <>
                  <li>
                    <div className='row'>
                      <div>Quant.</div>
                      <div>
                        <select value={qty} onChange={e => setQty(e.target.value)}>
                          { [...Array(countInStock).keys()].map( num => (
                            <option key={num} value={num+1}>{num+1}</option>
                          )) }
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button className='primary block' onClick={handleAddToCart}>
                      Adicionar ao carrinho
                    </button>
                  </li>
                </>
                : <button className="primary block">Me avise quando chegar</button>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
