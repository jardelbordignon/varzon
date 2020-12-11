import { Router } from 'express'
import multer from 'multer'

import { isAuth } from './utils/generateToken'
import configMulter from './config/multer'
import OrdersController from './controllers/OrdersController'
import ProductsController from './controllers/ProductsController'
import UsersController from './controllers/UsersController'

const routes = Router()
const upload = multer(configMulter)

//routes.get('/products/seed', ProductsController.seed)
routes.get('/products', ProductsController.index)
routes.get('/products/:id', ProductsController.show)
routes.post('/products', upload.array('images'), ProductsController.create)

routes.post('/users/signup', UsersController.create)
routes.post('/users/signin', UsersController.signin)
routes.put('/users/profile', isAuth, UsersController.profile)
routes.get('/users/:id', UsersController.show)

routes.post('/orders', isAuth, OrdersController.create)
routes.get('/orders/mine', isAuth, OrdersController.mine)
routes.get('/orders/:id', isAuth, OrdersController.show)
routes.put('/orders/:id/pay', isAuth, OrdersController.pay)

routes.get('/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

export default routes