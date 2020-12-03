import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'

export default function Home() {
  const dispatch = useDispatch()
  const productList = useSelector( state => state.productList )
  const { loading, error, products } = productList
    
  useEffect(() => dispatch(listProducts()), [])

  return (
    <div>
      { loading ? <LoadingBox /> : error ? <MessageBox variant='danger'>{error}</MessageBox> :
        <div className='row center'>
          { products.map(product => <Product key={product.id} product={product} />) }
        </div>
      }
    </div>
  )
}
