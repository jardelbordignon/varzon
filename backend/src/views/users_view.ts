import User from "../models/User";
import generateToken from '../utils/generateToken';

interface OptsProps {
  withToken?: boolean
}

export default {

  renderOne(user: User, opts?: OptsProps) {

    const userObj = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      createdAt: user.createdAt,
    }

    if (user.isSeller)
      Object.assign(userObj, {seller: user.seller})    

    if (opts?.withToken)
      Object.assign(userObj, { token: generateToken(user) })

    return userObj
  },

  renderMany(users: User[], opts?: OptsProps) {
    return users.map(user => this.renderOne(user, opts))
  }

}
