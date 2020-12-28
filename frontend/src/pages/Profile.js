import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsUser, updateUserProfile } from '../redux/user/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/user/userConsts'
import urlize from '../utils/urlize'

export default function Profile(props) {
  const [state, setState] = useState({ name: '', email: '' })
  const { userInfo } = useSelector(state => state.userSignin)
  const dispatch = useDispatch()
  const { loading, user, error } = useSelector(state => state.userDetails)
  const {
    loading: loadingUpdate, success: successUpdate, error: errorUpdate
  } = useSelector(state => state.userUpdateProfile)

  useEffect(() => {
    if (!user || user.id !== userInfo.id) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(detailsUser(userInfo.id))
    } else
      setState(user)
  }, [dispatch, user, userInfo.id])



  function submitHandler(e) {
    e.preventDefault()

    if (!state.password?.length) delete state.password
    if (state.password !== state.confirmPassword) {
      alert('Senha e confirmação não são iguais')
      return
    }

    dispatch(updateUserProfile(state))
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
              { successUpdate && <MessageBox variant='success'>{successUpdate}</MessageBox>}
              <div>
                <label htmlFor='name'>Nome</label>
                <input id='name' placeholder='Informe seu nome'
                  value={state.name}
                  onChange={e => setState({ ...state, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor='email'>E-mail</label>
                <input id='email' placeholder='Informe seu e-mail'
                  type='email'
                  value={state.email}
                  onChange={e => setState({ ...state, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor='password'>Senha</label>
                <input id='password' placeholder='Informe sua senha'
                  type='password'
                  onChange={e => setState({ ...state, password: e.target.value })} />
              </div>
              <div>
                <label htmlFor='password-confirmation'>Confirmação da senha</label>
                <input id='password-confirmation' placeholder='Confirme sua senha'
                  type='password'
                  onChange={e => setState({ ...state, confirmPassword: e.target.value })} />
              </div>
              {
                user.isSeller &&
                <>
                  <div>
                    <br/>
                    <h1>Minhas Lojas</h1>
                  </div>
                  <div>
                    <label htmlFor='sellerName'>
                      Nome da Loja - <strong>www.nomedosite.com/{state.seller?.url}</strong>
                    </label>
                    <input id='sellerName' placeholder='Informe o nome da loja'
                      value={state.seller?.name || ''}
                      onChange={e => setState({...state, seller: {...state.seller, name: e.target.value }})}
                      onBlur={e => setState({ ...state, seller: {...state.seller, url: urlize(e.target.value)}})}
                    />
                  </div>
                  {/* <div>
                    <label htmlFor='sellerUrl'>URL da Loja</label>
                    <strong>www.nomedosite.com/</strong>
                      <input id='sellerUrl' placeholder='Informe o link da loja'
                        value={state.seller?.url || ''}
                        onChange={e => setState({ ...state, seller: {...state.seller, url: e.target.value}})}
                        onBlur={e => setState({ ...state, seller: {...state.seller, url: urlize(e.target.value)}})}
                      />
                  </div> */}
                  <div>
                    <label htmlFor='sellerDescription'>Descrição da Loja</label>
                    <input id='sellerDescription' placeholder='Informe a descrição da loja'
                      value={state.seller?.description || ''}
                      onChange={e => setState({
                        ...state, seller: {
                          ...state.seller, description: e.target.value
                        }})}/>
                  </div>
                </>
              }
              <div>
                <label />
                <button className='primary' type='submit'>Salvar Alterações</button>
              </div>
            </>
          )
        }
      </form>
    </div>

  )
}
