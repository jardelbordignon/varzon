import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, removeFromCart } from '../redux/cart/cartActions'
import { formatPrice } from '../utils/formatters'
import MessageBox from '../components/MessageBox'

export default function Cart(props) {
  const dispatch = useDispatch()
  const { error, cartItems } = useSelector(state => state.cart)
  const productId = props.match.params.id
  const qty = Number(props.location.search.split('=')[1]) || 1

  useEffect(() => {
    if (productId)
      dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  function handleRemoveFromCart(productId) {
    dispatch(removeFromCart(productId))
  }

  function handleCheckout() {
    props.history.push('/signin?redirect=shipping')
  }

  if (!cartItems.length) {
    return (
      <MessageBox>Carrinho está vazio.
      <Link to='/'>Ver produtos</Link></MessageBox>
    )
  }
          
  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Carrinho de Compras</h1>
        { error && <MessageBox variant='danger'>{error}</MessageBox> }
        <ul>
          { cartItems.map(cartItem => (
            <li key={cartItem.productId}>
              <div className='row'>
                <div>
                  <img className='small'
                    src={cartItem.imageUrl} alt={cartItem.name} />
                </div>
                <div className='min-30'>
                  <Link to={`/product/${cartItem.productId}`}> {cartItem.name} </Link>
                </div>
                <div>
                  <select value={cartItem.qty}
                    onChange={e => 
                      dispatch(addToCart(cartItem.productId, Number(e.target.value)))
                    }>
                    { [...Array(cartItem.countInStock).keys()].map( num => (
                      <option key={num} value={num+1}>{num+1}</option>
                    )) }
                  </select>
                </div>
                <div>
                  {formatPrice(cartItem.price)}
                </div>
                <div>
                  <button onClick={() => handleRemoveFromCart(cartItem.productId)}>
                    Deletar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <div className='row'>
                <h2>Subtotal ({cartItems.reduce((a, item) => a + item.qty, 0)} itens)</h2>
                <h2>{formatPrice(cartItems.reduce((a, item) => a + item.qty * item.price, 0))}</h2>
              </div>
            </li>
            <li>
              <button className='primary block' disabled={!cartItems.length}
                onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
