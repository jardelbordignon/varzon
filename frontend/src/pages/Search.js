import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { listProducts } from '../redux/product/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductCard from '../components/ProductCard'
import { prices, ratings } from '../utils/data'
import Rating from '../components/Rating'

export default function Search(props) {
  const [filterState, setFilterState] = useState({})
  //const { name = 'all', category = 'all', min = 0, max = 0 } = useParams()
  const { loading, error, products } = useSelector( state => state.productList )
  const categoryList = useSelector( state => state.categoryList )
  const { loading:loadingCategories, error:errorCategories, categories } = categoryList
  const dispatch = useDispatch()

  useEffect(() => {
    async function setFilterStateByUrlParams() {
      const urlParams = window.location.pathname.split('/')
      const filterStateByUrlParams = {min:0, max:0, rating:0, order:'newest'}
      urlParams.forEach((param, index) => {
        if (['name', 'category', 'min', 'max'].includes(param)) {
          const paramValue = [param]=='min' || [param]=='max' ? Number(urlParams[index+1]) : urlParams[index+1]
          Object.assign(filterStateByUrlParams, { [param]: paramValue })
        }
      })
      setFilterState(filterStateByUrlParams)
    }
    setFilterStateByUrlParams()
  }, [])
  

  useEffect(() => {
    if (!!filterState)
      dispatch(listProducts(filterState))
  }, [dispatch, filterState])


  function getFilterUrl(filter) {
    const name     = filter.name     || filterState.name     || null
    const category = filter.category || filterState.category || null
    const min      = filter.min      || filterState.min      || null
    const max      = filter.max      || filterState.max      || null
    const rating   = filter.rating   || filterState.rating   || null
    const order    = filter.order    || filterState.order

    let url = '/search'
    if (name && filter.name != 'all')         url += `/name/${name}`
    if (category && filter.category != 'all') url += `/category/${category}`
    if (!!Number(min) && min > 0)             url += `/min/${min}`
    if (!!Number(max) && max > 0)             url += `/max/${max}`
    if (!!Number(rating) && rating > 0)       url += `/rating/${rating}`
    if (order != 'newest')                    url += `/order/${order}`

    
    return url
  }

  return (
    <div>
      <div className='row'>
        { JSON.stringify(filterState) }
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

        <div>
          Orderar por {' '}
          <select 
            value={filterState.order}
            onChange={ e => {
              setFilterState({...filterState, order: e.target.value })
              props.history.push(getFilterUrl({order: e.target.value}))
            }}>
            <option value=''></option>
            <option value='newest'>Mais novos</option>
            <option value='lowest'>Menor preço</option>
            <option value='highest'>Maior preço</option>
            <option value='toprated'>Melhor avaliação</option>

          </select>
        </div>
      </div>
      <div className='row top'>
        <div className='col-1'>
          <h3>Categorias</h3>
          <div>
            {
              loadingCategories
              ? <LoadingBox />
              : errorCategories
              ? <MessageBox variant='danger'>{errorCategories}</MessageBox>
              : (
                <ul>
                  <li key='0'>
                    <Link
                      onClick={() => setFilterState({...filterState, category: ''})}
                      to={getFilterUrl({ category: 'all'})}
                      className={ filterState.category==='' ? 'active' : ''}>
                      Todas
                    </Link>
                  </li>
                  { categories.map(c => (
                    <li key={c.id}>
                      <Link
                        to={getFilterUrl({ category: c.name })}
                        onClick={() => setFilterState({...filterState, category: c.name})}
                        className={ c.name === filterState.category ? 'active' : ''}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
          <div>
            <h3>Preço</h3>
            <ul>
              { prices.map( p => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    onClick={() => setFilterState({
                      ...filterState, min: Number(p.min)||0, max: Number(p.max)||0}
                    )}
                    className={ p.name === `${filterState.min}-${filterState.max}` ? 'active' : ''}>
                    {p.label}
                  </Link>
                </li>
              )) }
            </ul>
          </div>
          <div>
            <h3>Avaliações</h3>
            <ul>
              { ratings.map( r => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    onClick={() => setFilterState({...filterState, rating: r.rating})}
                    className={ filterState.rating===r.rating ? 'active' : ''}>
                    <Rating rating={r.rating} caption={'ou mais'} />
                  </Link>
                </li>
              )) }
            </ul>
          </div>
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
