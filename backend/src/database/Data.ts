import bcrypt from 'bcryptjs'

const Data = {
  users: [
    {
      name: 'Jardel',
      email: 'jardel@email.com',
      password: bcrypt.hashSync('12345', 8),
      isAdmin: true
    },
    {
      name: 'John',
      email: 'john@email.com',
      password: bcrypt.hashSync('12345', 8),
      isAdmin: true
    }
  ],
  products: [
    {
      id: '1',
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 20,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 9,
      description: 'High quality product'
    },
    {
      _id: '2',
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 125,
      countInStock: 10,
      brand: 'Adidias',
      rating: 4,
      numReviews: 10,
      description: 'High quality product'
    },
    {
      _id: '3',
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 115,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.5,
      numReviews: 20,
      description: 'High quality product'
    },
    {
      _id: '4',
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 89,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 11,
      description: 'High quality product'
    },
    {
      _id: '5',
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 86,
      countInStock: 20,
      brand: 'Puma',
      rating: 4,
      numReviews: 13,
      description: 'High quality product'
    },
    {
      _id: '6',
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 120,
      countInStock: 0,
      brand: 'Adidas',
      rating: 5,
      numReviews: 15,
      description: 'High quality product'
    }
  ]
}

export default Data