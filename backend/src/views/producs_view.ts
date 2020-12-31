import Product from "../models/Product";
import images_view from "./images_view";

export default {

  renderOne(product: Product) {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      countInStock: product.countInStock,
      brand: product.brand,
      rating: product.rating,
      description: product.description, 
      numReviews: product.numReviews,
      reviews: product.reviews,
      images: product.images ? images_view.renderMany(product.images) : [],
      seller: product.seller
    }
  },

  renderMany(products: Product[]) {
    return products.map((product => this.renderOne(product)))
  }

}