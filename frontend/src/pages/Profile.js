import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsUser, updateUserProfile } from '../redux/user/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/user/userConsts'

export default function Profile(props) {
  const [obj, setObj] = useState({ name: '', email: '' })
  const { userInfo } = useSelector(state => state.userSignin)
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector(state => state.userDetails)
  const { 
    loading: loadingUpdate, success: successUpdate, error: errorUpdate
  } = useSelector(state => state.userUpdateProfile)

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo.id))
    } else
      setObj(user)
  }, [dispatch, userInfo.id])

  // if (loading) return <LoadingBox />
  // if (error) return <MessageBox variant='danger'>{error}</MessageBox>
  // if (!user) return <div>Perfil não encontrado</div>

  function submitHandler(e) {
    e.preventDefault()

    if (obj.password !== obj.confirmPassword) {
      alert('Senha e confirmação não são iguais')
      return
    }

    dispatch(updateUserProfile(obj))
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Meu Perfil</h1>
        </div>
        {
          loading
          ? <LoadingBox />
          : error
          ? <MessageBox variant='danger'>{error}</MessageBox>
          : (
            <>
              { loadingUpdate && <LoadingBox /> }
              { errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox> }
              { successUpdate && <MessageBox variant='success'>Perfil atualizado com sucesso</MessageBox>}
              <div>
                <label htmlFor='name'>Nome</label>
                <input id='name' placeholder='Informe seu nome'
                  value={obj.name}
                  onChange={e => setObj({ ...obj, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor='email'>E-mail</label>
                <input id='email' placeholder='Informe seu e-mail'
                  type='email'
                  value={obj.email}
                  onChange={e => setObj({ ...obj, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor='password'>Senha</label>
                <input id='password' placeholder='Informe sua senha'
                  type='password'
                  onChange={e => setObj({ ...obj, password: e.target.value })} />
              </div>
              <div>
                <label htmlFor='password-confirmation'>Confirmação da senha</label>
                <input id='password-confirmation' placeholder='Confirme sua senha'
                  type='password'
                  onChange={e => setObj({ ...obj, confirmPassword: e.target.value })} />
              </div>
              <div>
                <label />
                <button className='primary' type='submit'>Alterar</button>
              </div>
            </>
          )
        }
      </form>
    </div>

  )
}
