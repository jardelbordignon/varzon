import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { createReview, detailsProduct } from '../redux/product/productActions'
import { formatPrice } from '../utils/formatters'
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_REVIEW_CREATE_RESET } from '../redux/product/productConsts'

export default function Product(props) {
  const [stateReview, setStateReview] = useState({rating:0, comment:''})
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const productDetails = useSelector( state => state.productDetails )
  const { loading, error, product } = productDetails
  const productReviewCreate = useSelector( state => state.productReviewCreate )
  const { loading:loadingReview, error:errorReview, success:successReview } = productReviewCreate
  const { userInfo } = useSelector( state => state.userSignin )
  const productId = props.match.params.id

  useEffect(() => {
    if (successReview) {
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
    }

    dispatch(detailsProduct(productId))
  }, [dispatch, productId, successReview])

  function handleAddToCart() {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  }

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!product) return <div>Produto não encontrado</div>

  const {images, seller, name, rating, numReviews, price, description, countInStock} = product

  function submitHandler(e) {
    e.preventDefault()
    if (stateReview.comment && stateReview.rating) {
      dispatch( createReview(product.id, stateReview) )
    }
  }

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
            <li>Valor: {formatPrice(price)}</li>
            <li>Descrição: {description}</li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  <Link to={`/s/${seller.id}`} >{seller.name}</Link>
                </h2>
                <Rating rating={3} numReviews={30} />
              </li>
              <li>
                <div className="row">
                  <div>Valor</div>
                  <div className="price">{formatPrice(price)}</div>
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
                : <li>
                    <button className="primary block">Me avise quando chegar</button>
                  </li>
              }
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <h2 id='reviews'>Avaliações</h2>
        { !product.reviews?.length && <MessageBox>Seja o primeiro a avaliar esse produto</MessageBox>}
        <ul>
          { product.reviews?.map( review => (
            <li key={review.id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=' ' />
              <p>{review.createdAt}</p>
              <p>{review.comment}</p>
            </li>
          )) }
          <li>
            { userInfo
              ?
              (!product.reviews?.find(review => review.name === userInfo.name) && !successReview) &&
              (
                <form className='form' onSubmit={submitHandler}>
                  <div>
                    <h2>Avalie esse produto</h2>
                  </div>
                  <div>
                    <label htmlFor='rating'></label>
                    <select id='rating'
                      value={stateReview.rating}
                      onChange={e => setStateReview({...stateReview, rating: e.target.value })}>
                      <option>Seleione...</option>
                      <option value='5'>Excelente</option> 
                      <option value='4'>Muito bom</option>
                      <option value='3'>Bom</option>
                      <option value='2'>Não é bom</option>
                      <option value='1'>Ruim</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor='comment'>Comentário</label>
                    <textarea id='comment'
                      value={stateReview.comment}
                      onChange={e => setStateReview({...stateReview, comment: e.target.value })}>
                    </textarea>
                  </div>
                  <div>
                    <br/>
                    <button className='primary' type='submit'>
                      { loadingReview ? <LoadingBox /> : 'Registrar' }
                    </button>
                  </div>
                  { errorReview && <MessageBox variant='danger'>{errorReview}</MessageBox> } 
                </form>
              )
              : (
                <MessageBox>
                  Por favor <Link to='/signin'>Entre</Link> para poder avaliar o produto.
                </MessageBox>
              )
            }    
          </li>
        </ul>
      </div>
    </div>
  )
}
