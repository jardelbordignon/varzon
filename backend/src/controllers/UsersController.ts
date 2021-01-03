import bcrypt from 'bcryptjs';
import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as Yup from 'yup'

import Seller from '../models/Seller'
import User from '../models/User'
import users_view from '../views/users_view'
//import generateToken from '../utils/generateToken'

export default {

  async index(req: Request, res: Response) {
    const repository:Repository<User> = getRepository(User)
    const users = await repository.find()

    return res.json(users_view.renderMany(users))
  },
  
  async topSellers(req: Request, res: Response) {
    const repository:Repository<User> = getRepository(User)

    const users = await repository.find({ 
      where: { isSeller: true },
      //order: { seller.rating: -1 },
      take: Number(req.params.limit),
      relations: ['seller']
    })

    return res.json(users_view.renderMany(users))
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(User)

    const user = await repository.findOne(req.params.id, { relations: ['seller'] })

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
    
    return res.json(users_view.renderOne(user))
  },

  async create(req: Request, res: Response) {
    const { name, email, password, isSeller=false, isAdmin=false } = req.body

    const repository = getRepository(User)
  
    const userData = { name, email, password, isSeller, isAdmin }

    const schema = Yup.object().shape({
      name:     Yup.string().required(),
      email:    Yup.string().required(),
      password: Yup.string().required(),
    })

    await schema.validate(userData, { abortEarly: false })
    
    userData.password = bcrypt.hashSync(userData.password, 8)

    const user = repository.create(userData)
  
    await repository.save(user)
  
    return res.status(201).json(user)
  },

  async signin(req: Request, res: Response) {
    const repository = getRepository(User)
    const { email, password } = req.body    
    const user = await repository.findOne({ email }, { relations: ['seller'] })
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'E-mail e/ou senha inválidos' })
      return
    }

    res.status(200).send(users_view.renderOne(user, { withToken:true }))
  },

  async profile(req: Request, res: Response) {
    const repository = getRepository(User)

    const user = await repository.findOne(req.user.id, { relations: ['seller'] })

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
    
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isSeller = !!req.body.isSeller
    user.isAdmin = !!req.body.isAdmin
    
    if (req.body.password)
      user.password = bcrypt.hashSync(req.body.password, 8)

    if (user.isSeller) {
      if (!user.seller) user.seller = new Seller()
      user.seller.url = req.body.seller.url || user.seller.url
      user.seller.name = req.body.seller.name || user.seller.name
      user.seller.logo = req.body.seller.logo || user.seller.logo
      user.seller.description = req.body.seller.description || user.seller.description
    }

    const updatedUser = await repository.save(user)
    
    res.status(200).send({ 
      user: users_view.renderOne(updatedUser), 
      message: 'Perfil atualizado com sucesso'
    }) 
  },

  async delete(req: Request, res: Response) {
    const repository = getRepository(User)

    const user = await repository.findOne(req.params.id)

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
    
    if(user.isAdmin)
      return res.status(400).json({ message: `${user.name} é administrador e não pode ser deletado` })
    
    const { name } = await repository.remove(user)

    res.status(200).send({ message: `Usuário ${name} deletado com sucesso` })
  },

  async userConfig(req: Request, res: Response) {
    const repository = getRepository(User)

    const user = await repository.findOne(req.body.id)

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
  
    user.name     = req.body.name || user.name
    user.email    = req.body.email || user.email
    user.isSeller = req.body.isSeller
    user.isAdmin  = req.body.isAdmin

    await repository.save(user)

    res.status(200).send({ message: 'ok'}) //.send(users_view.renderOne(user, true)) 
  }


}