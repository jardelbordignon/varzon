import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'

import { listProducts } from '../redux/product/productActions'
import { listTopSellers } from '../redux/user/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const dispatch = useDispatch()
  
  const productList = useSelector( state => state.productList )
  const { loading, error, products } = productList
  
  const userTopSellersList = useSelector( state => state.userTopSellersList )
  const { loading:loadingSellers, error:errorSellers, users:sellers } = userTopSellersList
    
  useEffect(() => {
    dispatch(listProducts({}))
    dispatch(listTopSellers(3))
  }, [dispatch])

  return (
    <div>
      <h2>Melhores vendedores</h2>
      {
        loadingSellers
        ? <LoadingBox />
        : errorSellers
        ? <MessageBox variant='danger'>{errorSellers}</MessageBox>
        : (
          <div>
            { console.log(sellers) }
            { !sellers.length
              ? <MessageBox>Nenhum vendedor encontrado</MessageBox>
              : (
                <Carousel showArrows autoPlay showThumbs={false}>
                  { sellers.map(seller => (
                    <div key={seller.id}>
                      <Link to={`/s/${seller.id}`}>
                        <img className='medium' src={seller.logo || '/images/no-image.jpg'} alt={seller.name} />
                        <p className='legend'>{seller.name}</p>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              )
            }
          </div>
        )
      }

      <h2>Destaques</h2>
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
  )
}
