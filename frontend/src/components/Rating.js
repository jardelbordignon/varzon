export default function Rating({ rating, numReviews }) {
  
  function stars() {
    return [1,2,3,4,5].map(num => (
      <span key={num}>
        <i className={`fa fa-${rating >= num ? 'star' : (rating >= num - 0.5 ? 'star-half-o' : 'star-o')}`}></i>
      </span>
    ))
  }

  return (
    <div className='rating'>
      {stars()}
      <span>{numReviews} avaliações</span>
    </div>
  )
}
