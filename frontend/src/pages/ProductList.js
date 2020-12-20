import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { formatPrice } from '../utils/formatters'

export default function ProductList(props) {

  const { loading, error, products } = useSelector( state => state.productList )
  const dispatch = useDispatch()

  useEffect(() => dispatch(listProducts()), [dispatch])

  function deleteHandler(product) {

  }
  
  return (
    <div>
      <h1>Produtos</h1>
      {
        loading
        ? <LoadingBox />
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (
          <table className='table'>
            <thead>
              <tr>
                <th>Cód</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button type='button' className='success'
                      onClick={() => props.history.push('/product/form/'+product.id)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button type='button' className='danger'
                      onClick={() => deleteHandler(product)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        )
      }
    
    </div>
  )
}
