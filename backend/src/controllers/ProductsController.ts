import { Request, Response } from 'express'
import { createQueryBuilder, getRepository, Like } from 'typeorm'
import * as Yup from 'yup'
import Category from '../models/Category'

import Product from '../models/Product'
import products_view from '../views/producs_view'

export default {

  async index(req: Request, res: Response) {
    const repository = getRepository(Product)

    let categoryFilter = {}
    if (req.query.category) {
      const category = await getRepository(Category).findOne({where: { name: req.query.category }})
      if (category) 
        categoryFilter = { categoryId: category.id }
    }
    const sellerFilter = req.query.sellerId && { sellerId: req.query.sellerId }
    const nameFilter = req.query.name && { name: Like(`%${req.query.name}%`) }

    const products = await repository.find({ 
      where: {...categoryFilter, ...sellerFilter, ...nameFilter}, relations: ['images', 'seller']
    })
    
    return res.json(products_view.renderMany(products))
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(Product)
    const { id } = req.params    
    //const product = await repository.findOneOrFail(id, { relations: ['images'] })
    const product = await repository.findOne(id, { relations: ['images', 'seller'] })

    if(!product)
      return res.status(404).json({ message: 'Produto não encontrado' })
    
    return res.json(products_view.renderOne(product))
  },

  validate(data: Object){
    const schema = Yup.object().shape({
      name:         Yup.string().required(),
      price:        Yup.number().required(),
      category:     Yup.string().required(),
      brand:        Yup.string().required(),
      countInStock: Yup.number().required(),
      rating:       Yup.number(),
      numReviews:   Yup.number(),
      description:  Yup.string().required().max(400),
      images:       Yup.array(
        Yup.object().shape({ path: Yup.string().required() })
      )
    })

    return schema.validate(data, { abortEarly: false })
  },

  // precisa estar logado e ser admin
  async create(req: Request, res: Response) {
    //console.log(req.files)
    const {
      seller,
      name,
      price,
      category,
      brand,
      countInStock,
      rating,
      numReviews,
      description
    } = req.body

    const reqImages = req.files as Express.Multer.File[]
    const images = reqImages.map(image => ({path: image.filename}))
    const repository = getRepository(Product)
  
    const data = {
      seller,
      name,
      price,
      category,
      brand,
      countInStock,
      rating,
      numReviews,
      description,
      images
    }

    //await this.validate(data)   

    const product = repository.create(data)
  
    await repository.save(product)
  
    return res.status(201).json(product)
  },

  
  async update(req: Request, res: Response) {
    const repository = getRepository(Product)

    const product = req.body.id
      ? await repository.findOne(req.body.id, { relations: ['images'] })
      : new Product()
    
    // if(!product)
    //   return res.status(404).json({ message: 'Produto não encontrado' })
    
    //await this.validate(req.body)
    //const product = new Product()
    
    if(!product)
       return res.status(404).json({ message: 'Produto não encontrado' })
    
    product.name = req.body.name
    product.price = req.body.price
    product.category = req.body.category
    product.brand = req.body.brand
    product.countInStock = req.body.countInStock
    product.rating = req.body.rating
    product.numReviews = req.body.numReviews
    product.description = req.body.description

    if (req.files) {
      const reqImages = req.files as Express.Multer.File[]
      const images = reqImages.map(image => ({path: image.filename}))
      Object.assign(product, images)
    }
    
    const updatedProduct = await repository.save(product)
    
    return res.status(201).json(products_view.renderOne(updatedProduct))
  },


  async delete(req: Request, res: Response) {
    const repository = getRepository(Product)

    const product = await repository.findOne(req.params.id)

    if(!product)
      return res.status(404).json({ message: 'Produto não encontrado' })

    await repository.remove(product)

    return res.status(204).json({ message: 'Produto deletado com sucesso'}) 
  }  

}