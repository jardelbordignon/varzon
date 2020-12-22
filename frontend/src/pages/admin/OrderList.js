import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { formatDate, formatPrice } from '../../utils/formatters'
import { deleteOrder, listOrders } from '../../redux/order/orderActions'
import { ORDER_DELETE_RESET } from '../../redux/order/orderConsts'


export default function OrderList(props) {
  const orderList = useSelector( state => state.orderList )
  const { loading, error, orders } = orderList
  const orderDelete = useSelector( state => state.orderDelete )
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = orderDelete
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET })
    dispatch(listOrders())
  }, [dispatch, successDelete])

  function deleteHandler(order) {
    if (window.confirm('Deseja mesmo excluir este registro?'))
      dispatch(deleteOrder(order.id))
  }

  return (
    <div>
      <h1>Pedidos</h1>
      { loadingDelete && <LoadingBox /> }
      { errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox> }
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
