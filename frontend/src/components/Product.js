import formatValue from '../utils/formatValue'
import Rating from './Rating'

export default function Products({product}) {
  console.log(product.images[0])
  return (
    <div key={product.id} className='card'>
      <a href={`/product/${product.id}`}>
        <img className='medium' src={product.images[0].url} alt={product.name} />
      </a>
      <div className='card-body'>
        <a href={`/products/${product.id}`}>
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
