import jwt from 'jsonwebtoken'
import User from '../models/User'

const generateToken = (user: User) => {
  const { id, name, email, isAdmin } = user
  return jwt.sign(
    { id, name, email, isAdmin },
    'compadrecomprameucocoporquequempoucocococomprapoucocococome',
    { expiresIn: '30d' }
  )
}

export default generateToken