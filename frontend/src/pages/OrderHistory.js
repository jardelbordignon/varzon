import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { formatPrice, formatDate } from '../utils/formatters'
import { listOrderMine } from '../redux/order/orderActions'

export default function OrderHistory(props) {
  const { loading, error, orders } = useSelector( state => state.orderMineList )
  const dispatch = useDispatch()

  useEffect(() => dispatch(listOrderMine()), [dispatch])

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!orders?.length) return <div>Nenhum pedido encontrado</div>

  return (
    <div>
      <h1>Meus Pedidos</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Código</th>
            <th>Data</th>
            <th>Total</th>
            <th>Pagamento</th>
            <th>Entrega</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          { orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatPrice(order.itemsPrice + order.shippingPrice + order.taxPrice)}</td>
              <td>{order.paidAt ? formatDate(order.paidAt) : 'Aguardando'}</td>
              <td>{order.deliveredAt ? formatDate(order.deliveredAt) : 'Aguardando'}</td>
              <td>
                <button className='small'
                  onClick={() => props.history.push(`/order/${order.id}`) }>
                  Detalhe
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
