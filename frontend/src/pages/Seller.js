import { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'

import { detailsUser } from '../redux/user/userActions'
import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Rating from '../components/Rating'
import ProductCard from '../components/ProductCard'

export default function Seller(props) {
  const sellerId = props.match.params.id
  const { loading, error, user } = useSelector( state => state.userDetails )
  const { 
    loading:loadingProducts, error:errorProducts, products
  } = useSelector( state => state.productList )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsUser(sellerId))
    dispatch(listProducts({ sellerId }))
  }, [dispatch, sellerId])

  return (
    <div className='row top'>
      <div className='col-1'>
        { loading
          ? <LoadingBox />
          : error
          ? <MessageBox variant='danger'>{error}</MessageBox>
          : (
            <ul className='card card-body'>
              <li>
                <div className='row left'>
                  <div className='p-1'>
                    <img className='small' src={user.seller.logo} alt={user.seller.name} />
                  </div>
                  <div className='p-1'>
                    <h1>{user.seller.name}</h1>
                  </div>
                </div>
              </li>
              <li>
                <Rating rating={user.rating} numReviews={user.numReviews} />
              </li>
              <li>
                <a href={`mailto:${user.email}`}></a>
              </li>
              <li>
                {user.seller.description}
              </li>
            </ul>
          )
        }
      </div>
      <div className='col-3'>
        {
          loadingProducts
          ? <LoadingBox />
          : errorProducts
          ? <MessageBox variant='danger'>{errorProducts}</MessageBox>
          : (
            <>
              { !products.length && <MessageBox>Nenhum produto encontrado</MessageBox> }
              <div className='row center'>
                { products.map(product => <ProductCard key={product.id} product={product}/> )}
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}
