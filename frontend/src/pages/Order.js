import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { formatPrice, formatDate } from '../utils/formatters'
import { deliverOrder, detailsOrder, payOrder } from '../redux/order/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../redux/order/orderConsts'

export default function Order(props) {
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = props.match.params.id
  const { order, loading, error } = useSelector( state => state.orderDetails )
  const orderPay = useSelector( state => state.orderPay )
  const { error: errorPay, loading: loadingPay, success: successPay } = orderPay
  const orderDeliver = useSelector( state => state.orderDeliver )
  const { error: errorDeliver, loading: loadingDeliver, success: successDeliver } = orderDeliver
  const { userInfo } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()

  useEffect(() => {
      const addPayPalScript = async () => {
        const { data } = await Axios.get('/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=BRL`
        script.async = true
        script.onload = () => setSdkReady(true)
        document.body.appendChild(script)
      }

      if (!order || successPay || successDeliver || (String(order?.id) !== orderId)) {
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(detailsOrder(orderId))
      } else {
        if (!order.data?.paidAt) {
          if (!window.paypal)
            addPayPalScript()
          else
            setSdkReady(true)
        }
      }
    },
    [dispatch, orderId, order, sdkReady, successPay, successDeliver]
  )

  function successPaymentHandler(paymentResult) {
    //console.log(paymentResult) // retorno do pagamento via paypal 
    dispatch(payOrder(order, paymentResult))
  }

  function deliverHandler() {
    dispatch(deliverOrder(order.id))
  }

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!order) return <div>Pedido não encontrado</div>

  const { fullName, street, number, neighborhood, complement, city, state, postalCode } = order.address
  const { itemsPrice, shippingPrice, taxPrice, deliveredAt, paidAt } = order

  return (
    <div>
      <h1>Pedido - {order.id}</h1>
      <div className='row top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className="card card-body">
                <h2>Entrega</h2>
                <p>
                  <strong>Nome:</strong> {fullName} <br />
                  <strong>Endereço:</strong>
                  {` ${street}, ${number} - ${neighborhood} (${complement})`} <br />
                  {` ${city}/${state} - ${postalCode}`}
                </p>
                { !!deliveredAt
                 ? <MessageBox variant='success'>Pedido enviado <strong>{formatDate(deliveredAt, true)}</strong></MessageBox>
                 : <MessageBox variant='danger'>Pedido não enviado</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Via:</strong> {order.paymentMethod}
                </p>
                { !!paidAt
                  ? <MessageBox variant='success'>Pagamento efetuado <strong>{formatDate(paidAt, true)}</strong></MessageBox>
                  : <MessageBox variant='danger'>Aguardando pagamento</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Itens</h2>
                <ul>
                  { order.orderItems.map(item => (
                    <li key={item.productId}>
                      <div className='row'>
                        <div>
                          <img className='small'
                            src={item.imageUrl} alt={item.name} />
                        </div>
                        <div className='min-30'>
                          <Link to={`/product/${item.productId}`}> {item.name} </Link>
                        </div>
                        <div>
                        { item.qty > 1 && (
                          <small>{item.qty} x {formatPrice(item.price)} = </small>) 
                        }
                        { formatPrice(item.qty * item.price) }
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
                  <div>{formatPrice(itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Frete</div>
                  <div>{formatPrice(shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Taxas de serviço</div>
                  <div>{formatPrice(taxPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div><strong>Total</strong></div>
                  <div><strong>{formatPrice(itemsPrice + shippingPrice + taxPrice)}</strong></div>
                </div>
              </li>
              { !paidAt &&
                <li>
                  { !sdkReady 
                    ? <LoadingBox />
                    : (
                      <>
                        { errorPay && <MessageBox variant='danger'>{errorPay}</MessageBox> }
                        { loadingPay && <LoadingBox /> }
                        <PayPalButton
                          amount={itemsPrice + shippingPrice + taxPrice}
                          options={{currency: 'BRL'}}
                          onSuccess={successPaymentHandler} />
                      </>
                    )
                  }
                </li>
              }
              { userInfo?.isAdmin && !!paidAt && !deliveredAt && 
                <li>
                  { loadingDeliver && <LoadingBox /> }
                  { errorDeliver && <MessageBox variant='danger'>{errorDeliver}</MessageBox> }
                  <button className='primary block' onClick={deliverHandler}>
                    Enviar Pedido
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
