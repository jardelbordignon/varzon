import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'

export default function Search(props) {
  const { name = 'all', category = 'all' } = useParams()
  const { loading, error, products } = useSelector( state => state.productList )
  const categoryList = useSelector( state => state.categoryList )
  const { loading:loadingCategories, error:errorCategories, categories } = categoryList
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts({ 
      name: name !== 'all' ? name : '',
      category: category !== 'all' ? category : '',
     }))
  }, [dispatch, name, category])

  function getFilterUrl(filter) {
    const filterCategory = filter.category || category
    const filterName     = filter.name     || name
    return `/search/category/${filterCategory}/name/${filterName}`
  }

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
          {
            loadingCategories
            ? <LoadingBox />
            : errorCategories
            ? <MessageBox variant='danger'>{errorCategories}</MessageBox>
            : (
              <ul>
                { categories.map(c => (
                  <li key={c.id}>
                    <Link
                      to={getFilterUrl({ category: c.name })}
                      className={ c.name === category ? 'active' : ''}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )
          }
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
