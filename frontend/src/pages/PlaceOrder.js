import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import CheckoutSteps from '../components/CheckoutSteps'
import formatValue from '../utils/formatValue'

export default function PlaceOrder(props) {
  const cart = useSelector(state => state.cart)
  if (!cart.paymentMethod) props.history.push('/payment')

  const dispatch = useDispatch()

  cart.itemsPrice = formatValue(
    cart.cartItems.reduce((total, item) => total + item.qty * item.price, 0), 'toF'
  )

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : formatValue(10, 'toF')
  cart.taxPrice = formatValue(.15 * cart.itemsPrice, 'toF')
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  function placeOrderHandler() {
    console.log(cart)
  }

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
                          <small>{cartItem.qty} x {formatValue(cartItem.price)} = </small>) 
                        }
                        { formatValue(cartItem.qty * cartItem.price) }
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
                  <div>{formatValue(cart.itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Frete</div>
                  <div>{formatValue(cart.shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Taxas de serviço</div>
                  <div>{formatValue(cart.taxPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div><strong>Total</strong></div>
                  <div><strong>{formatValue(cart.totalPrice)}</strong></div>
                </div>
              </li>
              <li>
                <button className='primary block'
                  disabled={!cart.cartItems.length}
                  onClick={placeOrderHandler}>
                  Finalizar Pedido
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
