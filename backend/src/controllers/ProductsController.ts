import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Product from '../models/Product'
import institutions_view from '../views/producs_view'

export default {

  async index(req: Request, res: Response) {
    const repository = getRepository(Product)
    const institutions = await repository.find({ relations: ['images'] })

    return res.json(institutions_view.renderMany(institutions))
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const repository = getRepository(Product)
    const Product = await repository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.json(institutions_view.renderOne(Product))
  },

  async create(req: Request, res: Response) {
    //console.log(req.files)
    const { 
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body

    const reqImages = req.files as Express.Multer.File[]
    const images = reqImages.map(image => ({path: image.filename}))
    const repository = getRepository(Product)
  
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    }

    const schema = Yup.object().shape({
      name:             Yup.string().required(),
      latitude:         Yup.number().required(),
      longitude:        Yup.number().required(),
      about:            Yup.string().required().max(300),
      instructions:     Yup.string().required(),
      opening_hours:    Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images:           Yup.array(
        Yup.object().shape({ path: Yup.string().required() })
      ).required()
    })

    // abortEarly: false não para a validação no primeiro erro, continua e mostra todos 
    await schema.validate(data, { abortEarly: false })

    const Product = repository.create(data)
  
    await repository.save(Product)
  
    return res.status(201).json(Product)
  }

}