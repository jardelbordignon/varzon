import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'

export default function Search(props) {
  const { name = 'all' } = useParams()
  const { loading, error, products } = useSelector( state => state.productList )
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(listProducts({ name: name !== 'all' ? name : '' }))
  }, [dispatch])

  return (
    <div>
      <div className='row'>
        {
          loading
          ? <LoadingBox />
          : error
          ? <MessageBox variant='danger'>{error}</MessageBox>
          : (
            <div>
              { products.length } resultados
            </div>
          )
        }
      </div>
      <div className='row top'>
        <div className='col-1'>
          <h3>Departamento</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className='col-3'>
          {
            loading
            ? <LoadingBox />
            : error
            ? <MessageBox variant='danger'>{error}</MessageBox>
            : (
              <div className='row center'>
                { !products.length
                  ? <MessageBox>Nenhum produto encontrado</MessageBox>
                  : products.map(product => <ProductCard key={product.id} product={product} />)
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
