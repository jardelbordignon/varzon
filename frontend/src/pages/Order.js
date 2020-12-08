import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import formatValue from '../utils/formatValue'
import { detailsOrder } from '../redux/order/orderActions'

export default function Order(props) {

  const orderId = props.match.params.id
  const { order, loading, error } = useSelector( state => state.orderDetails )
  const dispatch = useDispatch()

  useEffect(() => 
    dispatch(detailsOrder(orderId)),
    [dispatch, orderId]
  )

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!order) return <div>Pedido não encontrado</div>

  const { fullName, street, number, neighborhood, complement, city, state, postalCode } = order.data.address
  const { itemsPrice, shippingPrice, taxPrice, deliveredAt, paidAt } = order.data

  return (
    <div>
      <h1>Pedido - {order.data.id}</h1>
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
                 ? <MessageBox variant='success'>Pedido enviado em {deliveredAt}</MessageBox>
                 : <MessageBox variant='danger'>Pedido não enviado</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Via:</strong> {order.data.paymentMethod}
                </p>
                { !!paidAt
                  ? <MessageBox variant='success'>Pagamento efetuado em {paidAt}</MessageBox>
                  : <MessageBox variant='danger'>Aguardando pagamento</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Itens</h2>
                <ul>
                  { order.data.orderItems.map(item => (
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
                          <small>{item.qty} x {formatValue(item.price)} = </small>) 
                        }
                        { formatValue(item.qty * item.price) }
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
                  <div>{formatValue(itemsPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Frete</div>
                  <div>{formatValue(shippingPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Taxas de serviço</div>
                  <div>{formatValue(taxPrice)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div><strong>Total</strong></div>
                  <div><strong>{formatValue(itemsPrice + shippingPrice + taxPrice)}</strong></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
