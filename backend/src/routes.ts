import { Router } from 'express'
import multer from 'multer'

import { isAuth, isAdmin, isSellerOrAdmin } from './utils/generateToken'
import configMulter from './config/multer'
import OrdersController from './controllers/OrdersController'
import ProductsController from './controllers/ProductsController'
import UsersController from './controllers/UsersController'
import CategoriesController from './controllers/CategoriesController'

const routes = Router()
const upload = multer(configMulter)

//routes.get('/products/seed', ProductsController.seed)
routes.get('/categories', CategoriesController.index)

routes.get('/products', ProductsController.index)
routes.get('/products/:id', ProductsController.show)
routes.post('/products', isAuth, isSellerOrAdmin, upload.array('images'), ProductsController.create)
routes.put('/products', isAuth, isSellerOrAdmin, upload.array('images'), ProductsController.update)
routes.delete('/products/:id', isAuth, isAdmin, ProductsController.delete)
routes.post('/products/:id/reviews', isAuth, ProductsController.reviews)


routes.post('/users/signup', UsersController.create)
routes.post('/users/signin', UsersController.signin)
routes.put('/users/profile', isAuth, UsersController.profile)
routes.get('/users/:id', UsersController.show)
routes.get('/users/top-sellers/:limit', UsersController.topSellers)
routes.get('/users', isAuth, isAdmin, UsersController.index)
routes.delete('/users/:id', isAuth, isAdmin, UsersController.delete)
routes.put('/users/config/:id', isAuth, isAdmin, UsersController.userConfig)

routes.get('/orders', isAuth, isSellerOrAdmin, OrdersController.index)
routes.delete('/orders/:id', isAuth, isAdmin, OrdersController.delete)
routes.post('/orders', isAuth, OrdersController.create)
routes.get('/orders/mine', isAuth, OrdersController.mine)
routes.get('/orders/:id', isAuth, OrdersController.show)
routes.put('/orders/:id/pay', isAuth, OrdersController.pay)
routes.put('/orders/:id/deliver', isAuth, isAdmin, OrdersController.deliver)

routes.get('/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
routes.get('/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '')
})

export default routes