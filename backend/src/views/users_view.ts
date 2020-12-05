import User from "../models/User";

export default {

  renderOne(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    }
  },

  renderMany(users: User[]) {
    return users.map(user => this.renderOne(user))
  }

}
