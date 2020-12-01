import formatValue from '../utils/formatValue'
import Rating from './Rating'

export default function Products({product}) {
  return (
    <div key={product._id} className='card'>
      <a href={`/products/${product._id}`}>
        <img className='medium' src={`./images/p${product._id}.jpg`} alt={product.name} />
      </a>
      <div className='card-body'>
        <a href={`/products/${product._id}`}>
          <h2>{product.name}</h2>
        </a>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <div className='price'>
          {formatValue(product.price)}
        </div>
      </div>
    </div>
  )
}
