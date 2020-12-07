import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as Yup from 'yup'

import Order from '../models/Order'
import OrderItem from '../models/OrderItem'
//import orders_view from '../views/producs_view'

export default {

  async index(req: Request, res: Response) {
    const repository:Repository<Order> = getRepository(Order)
    const orders = await repository.find({ relations: ['orderItems', 'address'] })

    return res.json(orders)
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(Order)
    const { id } = req.params    
    //const order = await repository.findOneOrFail(id, { relations: ['images'] })
    const order = await repository.findOne(id, { relations: ['orderItems', 'address'] })

    if(!order)
      return res.status(404).json({ message: 'Pedido não encontrado' })
    
    return res.json(order)
  },

  async create(req: Request, res: Response) {

    if (!req.body.orderItems.length) {
      res.status(400).json({ message: 'Carrinho de compras está vazio'})
      return
    }
    

    const repository = getRepository(Order)
  
    // const schema = Yup.object().shape({
    //   name:             Yup.string().required(),
    //   latitude:         Yup.number().required(),
    //   longitude:        Yup.number().required(),
    //   about:            Yup.string().required().max(300),
    //   instructions:     Yup.string().required(),
    //   opening_hours:    Yup.string().required(),
    //   open_on_weekends: Yup.boolean().required(),
    //   images:           Yup.array(
    //     Yup.object().shape({ path: Yup.string().required() })
    //   ).required()
    // })

    // abortEarly: false não para a validação no primeiro erro, continua e mostra todos 
    // await schema.validate(data, { abortEarly: false })

    const orderData = {
      orderItems:      req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod:   req.body.paymentMethod,
      itemsPrice:      req.body.itemsPrice,
      shippingPrice:   req.body.shippingPrice,
      taxPrice:        req.body.taxPrice,
      user:            req.user.id
    }

    const order = repository.create(orderData)
  
    await repository.save(order)
  
    return res.status(201).json({ message: 'Pedido criado com sucesso', order })
  }

}