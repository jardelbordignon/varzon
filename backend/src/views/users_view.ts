import User from "../models/User";
import generateToken from '../utils/generateToken';

export default {

  renderOne(user: User, withToken=false) {
    const userObj = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      createdAt: user.createdAt,
    }

    if (withToken)
      Object.assign(userObj, { token: generateToken(user) })
    
    return userObj
  },

  renderMany(users: User[], withToken=false) {
    return users.map(user => this.renderOne(user, withToken))
  }

}
