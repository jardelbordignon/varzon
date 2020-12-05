import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signin } from '../redux/user/userActions';

export default function SignIn(props) {
  const [obj, setObj] = useState({email: '', password: ''})
  const { userInfo, loading, error } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()
  const redirect = props.location.search.split('=')[1] || '/'

  useEffect(() => {
    if (userInfo) props.history.push(redirect)
  }, [props.history, redirect, userInfo])

  function submitHandler(e) {
    e.preventDefault();
    dispatch(signin(obj))
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Autenticação</h1>
        </div>
        { loading && <LoadingBox /> }
        { error && <MessageBox variant='danger'>{error}</MessageBox> }
        <div>
          <label htmlFor='email'>E-mail</label>
          <input type='email' placeholder='Informe seu e-mail' required
            onChange={e => setObj({...obj, email: e.target.value})} />
        </div>
        <div>
          <label htmlFor='password'>Senha</label>
          <input type='password' placeholder='Informe sua senha' required
            onChange={e => setObj({...obj, password: e.target.value})} />
        </div>
        <div>
          <br />
          <button className='primary' type='submit'>Entrar</button>
        </div>
        <div>
          <br />
          <div>
            Não é cadastrado? <Link to='/register'>Crie sua conta</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
