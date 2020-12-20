import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RestrictedRoute({ component: Component, onlyAdmin=false, ...rest }) {
  const { userInfo } = useSelector( state => state.userSignin )
  const condition = onlyAdmin ? (userInfo && userInfo.isAdmin) : userInfo

  return (
    <Route
      {...rest}
      render={ props => condition ? <Component {...props} /> : <Redirect to='/signin' /> }
    />
  )
}
