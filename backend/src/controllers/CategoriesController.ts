import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import * as Yup from 'yup'

import Category from '../models/Category'
//import categories_view from '../views/categories_view'

export default {

  async index(req: Request, res: Response) {
    const repository:Repository<Category> = getRepository(Category)

    const categories = await repository.find()

    return res.json(categories)
  }

}