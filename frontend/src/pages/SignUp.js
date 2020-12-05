import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signup } from '../redux/user/userActions';

export default function SignUp(props) {
  const [obj, setObj] = useState({name: '', email: '', password: '', passwordConfirmation: ''})
  const { userInfo, loading, error } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()
  const redirect = props.location.search.split('=')[1] || '/'

  useEffect(() => {
    if (userInfo) props.history.push(redirect)
  }, [props.history, redirect, userInfo])

  function submitHandler(e) {
    e.preventDefault();

    if (obj.password !== obj.passwordConfirmation) {
      alert('Senha e confirmação não são iguais')
      return 
    } 

    dispatch(signup(obj))
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Cadastro</h1>
        </div>
        { loading && <LoadingBox /> }
        { error && <MessageBox variant='danger'>{error}</MessageBox> }
        <div>
          <label htmlFor='name'>Nome</label>
          <input placeholder='Informe seu nome' required
            onChange={e => setObj({...obj, name: e.target.value})} />
        </div>
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
          <label htmlFor='passwordConfirmation'>Confirmar Senha</label>
          <input type='password' placeholder='Confirme sua senha' required
            onChange={e => setObj({...obj, passwordConfirmation: e.target.value})} />
        </div>
        <div>
          <br />
          <button className='primary' type='submit'>Criar conta</button>
        </div>
        <div>
          <br />
          <div>
            Já tem uma conta? <Link to={`/signin?redirect=${redirect}`}>Entrar</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
