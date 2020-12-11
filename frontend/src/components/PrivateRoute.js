import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector( state => state.userSignin )

  return (
    <Route
      {...rest}
      render={ props => userInfo ? <Component {...props} /> : <Redirect to='/signin' /> }
    />
  )
}
