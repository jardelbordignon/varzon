import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const dispatch = useDispatch()
  const productList = useSelector( state => state.productList )
  const { loading, error, products } = productList
    
  useEffect(() => dispatch(listProducts()), [dispatch])

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!products) return <div>Nenhum produto encontrado</div>

  return (
    <div>
      <div className='row center'>
        { products.map(product => <ProductCard key={product.id} product={product} />) }
      </div>
    </div>
  )
}
