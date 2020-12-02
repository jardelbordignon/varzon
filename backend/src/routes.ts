import { Router } from 'express'
import multer from 'multer'

import configMulter from './config/multer'
import ProductsController from './controllers/ProductsController'

const routes = Router()
const upload = multer(configMulter)

routes.get('/products', ProductsController.index)
routes.get('/products/:id', ProductsController.show)
routes.post('/products', upload.array('images'), ProductsController.create)

export default routes