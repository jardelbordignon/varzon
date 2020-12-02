import { useState, useEffect } from 'react'
import axios from 'axios'
//import {data} from '../data'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/products')
        setLoading(false)
        setProducts(data)
      } catch(err) {
        setError(err.message)
        setLoading(false)
      }
      
    }
    fetchData()
  }, [])

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
