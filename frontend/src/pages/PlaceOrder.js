import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import CheckoutSteps from '../components/CheckoutSteps'
import { formatPrice } from '../utils/formatters'
import { createOrder } from '../redux/order/orderActions'
import { ORDER_CREATE_RESET } from '../redux/order/orderConsts'

export default function PlaceOrder(props) {
  const cart = useSelector(state => state.cart)
  if (!cart.paymentMethod) props.history.push('/payment')

  const dispatch = useDispatch()
  const {loading, success, error, order} = useSelector( state => state.orderCreate )

  cart.itemsPrice = formatPrice(
    cart.cartItems.reduce((total, item) => total + item.qty * item.price, 0), 'toF'
  )

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : formatPrice(10, 'toF')
  cart.taxPrice = formatPrice(.15 * cart.itemsPrice, 'toF')
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  function placeOrderHandler() {
    console.log(cart)
    dispatch(createOrder({...cart, orderItems: cart.cartItems}))
  }

  useEffect(() => {
    if (success) {
      props.history.push('/order/'+ order.id)
      dispatch({ type: ORDER_CREATE_RESET })
    } 
  }, [dispatch, order, props.history, success])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className="card card-body">
                <h2>Entrega</h2>
                <p>
                  <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Endereço:</strong>
                  {cart.shippingAddress.address}
                  ({cart.shippingAddress.complement}),
                  {cart.shippingAddress.neighborhood}
                  {cart.shippingAddress.city}
                  {cart.shippingAddress.state}
                  {cart.shippingAddress.country}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Via:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Itens</h2>
                <ul>
                  { cart.cartItems.map(cartItem => (
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
                        { cartItem.qty > 1 && (
                          <small>{cartItem.qty} x {formatPrice(cartItem.price)} = </small>) 
                        }
                        { formatPrice(cartItem.qty * cartItem.price) }
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Resumo do Pedido</h2>
              </li>
              <li>
                <div className='row'>
                  <div>Valor dos itens</div>
                  <div>{formatPrice(cart.itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Frete</div>
                  <div>{formatPrice(cart.shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Taxas de serviço</div>
                  <div>{formatPrice(cart.taxPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div><strong>Total</strong></div>
                  <div><strong>{formatPrice(cart.totalPrice)}</strong></div>
                </div>
              </li>
              <li>
                <button className='primary block'
                  disabled={!cart.cartItems.length}
                  onClick={placeOrderHandler}>
                  Finalizar Pedido
                </button>
              </li>
              { loading && <LoadingBox /> }
              { error && <MessageBox variant='danger'>{error}</MessageBox> }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
