import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ConditionedRoute({ component: Component, seller=false, admin=false, ...rest }) {
  const { userInfo } = useSelector( state => state.userSignin )
  //const condition = admin ? (userInfo && userInfo.isAdmin) : userInfo
  let condition = !!userInfo
  if (seller) condition = condition && userInfo.isSeller
  if (admin) condition = condition && userInfo.isAdmin

  return (
    <Route
      {...rest}
      render={ props => condition ? <Component {...props} /> : <Redirect to='/signin' /> }
    />
  )
}
