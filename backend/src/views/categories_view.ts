import Category from "../models/Category";

export default {

  renderOne(category: Category) {
    return {
      id: category.id,
      name: category.name
    }
  },

  renderMany(categories: Category[]) {
    return categories.map((category => this.renderOne(category)))
  }

}
