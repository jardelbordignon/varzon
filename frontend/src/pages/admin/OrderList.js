import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { listOrders } from '../../redux/order/orderActions'
import { formatDate, formatPrice } from '../../utils/formatters'


export default function OrderList(props) {
  const orderList = useSelector( state => state.orderList )
  const { loading, error, orders } = orderList
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch])

  function deleteHandler(product) {
    if (window.confirm('Deseja mesmo excluir este registro?'))
      console.log('DELETE ORDER')
      //dispatch(deleteProduct(product.id))
  }

  return (
    <div>
      <h1>Pedidos</h1>
      { loading 
        ? <LoadingBox />
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (    
          <table className='table'>
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
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
                  <td>{order.user.name}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{formatPrice(order.itemsPrice + order.shippingPrice + order.taxPrice)}</td>
                  <td>{order.paidAt ? formatDate(order.paidAt) : 'Aguardando'}</td>
                  <td>{order.deliveredAt ? formatDate(order.deliveredAt) : 'Aguardando'}</td>
                  <td>
                    <button type='button' className='info'
                      onClick={() => props.history.push(`/order/${order.id}`) }>
                      <i className="fa fa-eye"></i>
                    </button>
                    <button type='button' className='danger'
                      onClick={() => deleteHandler(order)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        )}
    </div>
  )
}
