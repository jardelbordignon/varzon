import { Router } from 'express'
import multer from 'multer'

import { isAuth, isAdmin } from './utils/generateToken'
import configMulter from './config/multer'
import OrdersController from './controllers/OrdersController'
import ProductsController from './controllers/ProductsController'
import UsersController from './controllers/UsersController'

const routes = Router()
const upload = multer(configMulter)

//routes.get('/products/seed', ProductsController.seed)
routes.get('/products', ProductsController.index)
routes.get('/products/:id', ProductsController.show)
routes.post('/products', isAuth, isAdmin, upload.array('images'), ProductsController.create)
routes.put('/products', isAuth, isAdmin, upload.array('images'), ProductsController.update)
routes.delete('/products/:id', isAuth, isAdmin, ProductsController.delete)


routes.post('/users/signup', UsersController.create)
routes.post('/users/signin', UsersController.signin)
routes.put('/users/profile', isAuth, UsersController.profile)
routes.get('/users/:id', UsersController.show)

routes.get('/orders', isAuth, isAdmin, OrdersController.index)
routes.delete('/orders/:id', isAuth, isAdmin, OrdersController.delete)
routes.post('/orders', isAuth, OrdersController.create)
routes.get('/orders/mine', isAuth, OrdersController.mine)
routes.get('/orders/:id', isAuth, OrdersController.show)
routes.put('/orders/:id/pay', isAuth, OrdersController.pay)
routes.put('/orders/:id/deliver', isAuth, isAdmin, OrdersController.deliver)

routes.get('/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

export default routes