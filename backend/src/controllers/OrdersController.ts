import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as Yup from 'yup'

import User from '../models/User'
import Order from '../models/Order'
import Address from '../models/Address'
//import orders_view from '../views/producs_view'

export default {

  async index(req: Request, res: Response) {
    const repository:Repository<Order> = getRepository(Order)

    const sellerFilter = req.query.sellerId && { sellerId: req.query.sellerId }

    const orders = await repository.find({ where: {...sellerFilter}, relations: ['user', 'orderItems', 'address'] })

    return res.json(orders)
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(Order)
    const { id } = req.params    

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
    
    const userRepository = getRepository(User)
    const addressRepository = getRepository(Address)
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
    
    const user = await userRepository.findOne(req.user.id)
    
    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado'})
      return
    }

    const newAddress = new Address()
    newAddress.user = user
    Object.assign(newAddress, req.body.shippingAddress)
    const address = await addressRepository.save(newAddress)

    const orderData = {
      user, 
      address, 
      orderItems: req.body.orderItems, 
      paymentMethod: req.body.paymentMethod, 
      itemsPrice: req.body.itemsPrice, 
      shippingPrice: req.body.shippingPrice, 
      taxPrice: req.body.taxPrice,
      sellerId: req.body.orderItems[0].sllerId
    }
    
    const order = repository.create(orderData)
  
    await repository.save(order)
    //const getOrder = await repository.findOne(order.id, { relations: ['orderItems', 'address'] })
      
    return res.status(201).json({ message: 'Pedido criado com sucesso', order})
  },

  async pay(req: Request, res: Response) {
    const repository = getRepository(Order)
    
    const order = await repository.findOne(req.params.id)

    if(!order)
      return res.status(404).json({ message: 'Pedido não encontrado' })
    
    const { id, status, update_time } = req.body
    const { email_address, payer_id } = req.body.payer

    order.paidAt = new Date(Date.now())
    order.paymentId = id
    order.paymentStatus = status
    order.paymentUpdateTime = update_time
    order.paymentEmailAddress = email_address

    const updatedOrder = await repository.save(order)
    return res.status(201).json({ message: 'Pagamento efetuado com sucesso', order: updatedOrder })    
  },

  async mine(req: Request, res: Response) {
    const repository = getRepository(Order)
    const orders = await repository.find({where: { user: req.user.id }})

    res.send(orders)
  },

  async delete(req: Request, res: Response) {
    const repository = getRepository(Order)    

    const order = await repository.findOne(req.params.id)

    if(!order)
      return res.status(404).json({ message: 'Pedido não encontrado' })
    
    await repository.remove(order)

    return res.status(204).json({ message: 'Pedido deletado com sucesso'})
  },


  async deliver(req: Request, res: Response) {
    const repository = getRepository(Order)
    
    const order = await repository.findOne(req.params.id)

    if(!order)
      return res.status(404).json({ message: 'Pedido não encontrado' })
    
    order.deliveredAt = new Date(Date.now())

    const updatedOrder = await repository.save(order)
    return res.status(201).json({ message: 'Pedido enviado', order: updatedOrder })    
  },


}