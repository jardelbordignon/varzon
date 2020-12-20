import bcrypt from 'bcryptjs';
import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as Yup from 'yup'

import User from '../models/User'
import users_view from '../views/users_view'
import generateToken from '../utils/generateToken'

export default {

  async index(req: Request, res: Response) {
    const repository:Repository<User> = getRepository(User)
    const users = await repository.find()

    return res.json(users_view.renderMany(users))
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(User)
    const { id } = req.params    
    //const user = await repository.findOneOrFail(id, { relations: ['images'] })
    const user = await repository.findOne(id)

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
    
    return res.json(users_view.renderOne(user))
  },

  async create(req: Request, res: Response) {
    const { name, email, password, isAdmin=false } = req.body

    const repository = getRepository(User)
  
    const userData = { name, email, password, isAdmin }

    const schema = Yup.object().shape({
      name:     Yup.string().required(),
      email:    Yup.string().required(),
      password: Yup.string().required(),
      isAdmin:  Yup.boolean().required(),
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
    const user = await repository.findOne({ email })
    
    if (!user) {
      res.status(401).send({ message: 'E-mail e/ou senha inválidos' })
      return
    }

    //if (password === user.password) {
    if (bcrypt.compareSync(password, user.password)) {
      // const loggedData = {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      //   isAdmin: user.isAdmin,
      //   token: generateToken(user)
      // }

      res.status(200).send(users_view.renderOne(user, true))
    } else {
      res.status(401).send({ message: 'E-mail e/ou senha inválidos' })
    }
  },

  async profile(req: Request, res: Response) {
    const repository = getRepository(User)

    const user = await repository.findOne(req.user.id)

    if(!user)
      return res.status(404).json({ message: 'Usuário não encontrado' })
    
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password)
      user.password = bcrypt.hashSync(req.body.password, 8)

    const updatedUser = await repository.save(user)

    res.status(200).send(users_view.renderOne(updatedUser, true)) 
  }


}