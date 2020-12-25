import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import { listUsers, deleteUser } from '../../redux/user/userActions'
import { USER_DETAILS_RESET } from '../../redux/user/userConsts' 

export default function UserList(props) {
  const userList = useSelector( state => state.userList )
  const { loading, error, users } = userList
  
  const userDelete = useSelector( state => state.userDelete )
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = userDelete
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listUsers())
    dispatch({ type: USER_DETAILS_RESET })
  }, [dispatch, successDelete])

  function deleteHandler(user) {
    if (window.confirm(`Deseja mesmo excluir o usuário ${user.name}?`))
      dispatch(deleteUser(user.id))
  }

  return (
    <div>
      <h1>Usuários</h1>
      { loadingDelete && <LoadingBox /> }
      { errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox> }
      { successDelete && <MessageBox variant='success'>{successDelete}</MessageBox> }
      { loading
        ? <LoadingBox />
        : error
        ? <MessageBox variant='danger'>{error}</MessageBox>
        : (
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Lojista</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                users.map( user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><i className={`fa fa-${user.isSeller ? 'check-circle-o success' : 'ban danger'}`} /></td>
                    <td><i className={`fa fa-${user.isAdmin ? 'check-circle-o success' : 'ban danger'}`} /></td>
                    <td>
                      <button type='button' onClick={() => props.history.push(`/admin/users/${user.id}/edit`)}>
                        <i className="fa fa-edit success" />
                      </button>
                      { !user.isAdmin &&
                        <button type='button' onClick={() => deleteHandler(user)}>
                          <i className="fa fa-trash danger" />
                        </button>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}
