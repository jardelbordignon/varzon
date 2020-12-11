import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsUser } from '../redux/user/userActions'

export default function Profile(props) {
  const { userInfo } = useSelector( state => state.userSignin )
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector( state => state.userDetails )

  useEffect(() => dispatch(detailsUser(userInfo.id)), [dispatch, userInfo.id])

  if (loading) return <LoadingBox />
  if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  if (!user) return <div>Perfil não encontrado</div>

  function submitHandler(e) {
    e.preventDefault()

  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Meu Perfil</h1>
        </div>
        <div>
          <label htmlFor='name'>Nome</label>
          <input id='name' placeholder='Informe seu nome'
           value={user.name} />
        </div>
        <div>
          <label htmlFor='email'>E-mail</label>
          <input id='email' placeholder='Informe seu e-mail'
          type='email'
           value={user.email} />
        </div>
        <div>
          <label htmlFor='password'>Senha</label>
          <input id='password' placeholder='Informe sua senha'
          type='password' />
        </div>
        <div>
          <label htmlFor='password-confirmation'>Confirmação da senha</label>
          <input id='password-confirmation' placeholder='Confirme sua senha'
          type='password' />
        </div>
        <div>
          <label />
          <button className='primary' type='submit'>Alterar</button>
        </div>
      </form>
    </div>
  )
}
