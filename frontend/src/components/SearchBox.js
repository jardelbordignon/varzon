import { useState } from 'react'

export default function SearchBox(props) {
  const [name, setName] = useState('')

  function submitHandler(e) {
    e.preventDefault()
    props.history.push('/search/name/'+name)
  }

  return (
    <form className='search' onSubmit={submitHandler}>
      <div className='row'>
        <input name='q' id='q' onChange={e => setName(e.target.value)} />
        <button className='primary' type='submit'>
          <i className='fa fa-search'/>
        </button>
      </div>
    </form>
  )
}
