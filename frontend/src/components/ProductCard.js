import { Link } from 'react-router-dom'

import { formatPrice } from '../utils/formatters'
import Rating from './Rating'

export default function ProductCard({product}) {
  return (
    <div key={product.id} className='card'>
      <Link to={`/product/${product.id}`}>
        <img className='medium' src={product.images[0].url} alt={product.name} />
      </Link>
      <div className='card-body'>
        <Link to={`/products/${product.id}`}>
          <h2>{product.name}</h2>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <div className='price'>
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  )
}
