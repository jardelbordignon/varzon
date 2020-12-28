import { useLocation, Link } from 'react-router-dom'

export default function LinkUnlessCurrent({to, children}) {

  const location = useLocation()
  
  return (
    location.pathname !== to && <Link to={to}>{children}</Link>
  )
}
