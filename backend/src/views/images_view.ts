import Image from "../models/Image";

export default {

  renderOne(image: Image) {
    //const host = 'http://192.168.1.105:3333'
    const host = 'http://localhost:3333'
    return {
      id: image.id,
      url: `${host}/uploads/${image.path}`
    }
  },

  renderMany(images: Image[]) {
    return images.map((image => this.renderOne(image)))
  }

}
