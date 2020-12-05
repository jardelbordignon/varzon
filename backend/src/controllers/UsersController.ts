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
    const user = await repository.findOne(id, { relations: ['images'] })

    if(!user)
      return res.status(404).json({ message: 'Produto não encontrado' })
    
    return res.json(users_view.renderOne(user))
  },

  async create(req: Request, res: Response) {
    const { name, email, password, isAdmin } = req.body

    // const reqImages = req.files as Express.Multer.File[]
    // const images = reqImages.map(image => ({path: image.filename}))
    const repository = getRepository(User)
  
    const data = { name, email, password, isAdmin }

    const schema = Yup.object().shape({
      name:     Yup.string().required(),
      email:    Yup.string().required(),
      password: Yup.string().required(),
      isAdmin:  Yup.boolean().required(),
      // latitude:         Yup.number().required(),
      // longitude:        Yup.number().required(),
      // images:           Yup.array(
      //   Yup.object().shape({ path: Yup.string().required() })
      // ).required()
    })

    // abortEarly: false não para a validação no primeiro erro, continua e mostra todos 
    await schema.validate(data, { abortEarly: false })

    const user = repository.create(data)
  
    await repository.save(user)
  
    return res.status(201).json(user)
  },


  async signin(req: Request, res: Response) {
    const repository = getRepository(User)
    const { email, password } = req.body    
    const user = await repository.findOne({ email })
    console.log(user)
    if (!user) {
      res.status(401).send({ message: 'E-mail e/ou senha inválidos' })
      return
    }

    if (password === user.password) {
    //if (bcrypt.compareSync(password, user.password)) {
      const loggedData = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
      }

      res.status(200).send(loggedData)
    } else {
      res.status(401).send({ message: 'E-mail e/ou senha inválidos' })
    }
  }

}