import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { detailsUser, updateUserConfig } from '../../redux/user/userActions'
import { USER_UPDATE_CONFIG_RESET } from '../../redux/user/userConsts'

export default function UserEdit(props) {
  const userId = props.match.params.id
  const [state, setState] = useState({name:'', email:'', isSeller:false, isAdmin:false})
  const dispatch = useDispatch()
  const { loading, error, user } = useSelector( state => state.userDetails )
  const { 
    loading:loadingUpdateConfig, 
    error:errorUpdateConfig, 
    success:successUpdateConfig
  } = useSelector( state => state.userUpdateConfig )


  useEffect(() => {
    if (successUpdateConfig) {
      dispatch({ type: USER_UPDATE_CONFIG_RESET})
      props.history.push('/admin/users')
    }
    if (!user || user.id != userId)
      dispatch(detailsUser(userId))
    else
      setState(user)    
  }, [dispatch, props.history, user, userId, successUpdateConfig])

  function submitHandler(e) {
    e.preventDefault()
    dispatch(updateUserConfig(state))
  }

  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Editando {state.name}</h1>
          { loadingUpdateConfig && <LoadingBox /> }
          { errorUpdateConfig && <MessageBox variant='danger'>{errorUpdateConfig}</MessageBox>}
        </div>
        { loading 
          ? <LoadingBox /> 
          : error 
          ? <MessageBox variant='danger'>{error}</MessageBox> 
          : 
          <>
            <div>
              <label htmlFor='name'>Nome</label>
              <input placeholder='Informe seu nome' required
                value={state.name}
                onChange={e => setState({...state, name: e.target.value})} />
            </div>
            <div>
              <label htmlFor='email'>E-mail</label>
              <input type='email' placeholder='Informe seu e-mail' required
                value={state.email}
                onChange={e => setState({...state, email: e.target.value})} />
            </div>
            <div>
              <input id='isSeller' type='checkbox' checked={state.isSeller}
                onChange={e => setState({...state, isSeller: e.target.checked})} />
              <label htmlFor='isSeller'>Lojista?</label>
            </div>
            <div>
              <input id='isAdmin' type='checkbox' checked={state.isAdmin}
                onChange={e => setState({...state, isAdmin: e.target.checked})} />
              <label htmlFor='isAdmin'>Administrador?</label>
            </div>
            <div>
              <br />
              <button className='primary' type='submit'>Salvar Alterações</button>
            </div>
          </>
        }
      </form>
    </div>
  )
}
