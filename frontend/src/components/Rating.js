export default function Rating({ rating, numReviews='', caption='' }) {
  
  //if (!numReviews) return <div></div>

  return (
    <div className='rating'>
      {
        [1,2,3,4,5].map(num => (
          <span key={num}>
            <i className={
              `fa fa-${rating >= num ? 'star' : (rating >= num - 0.5 ? 'star-half-o' : 'star-o')}`
            } />
          </span>
        ))
      }
      
      { caption
        ? <span>{caption}</span>
        : <span>{numReviews} avaliações</span>
      }
    </div>
  )
}
