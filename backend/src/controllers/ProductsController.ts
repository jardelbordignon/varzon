import { Request, Response } from 'express'
import { createQueryBuilder, getRepository, Like, LessThan, MoreThan, Between } from 'typeorm'
import * as Yup from 'yup'
import Category from '../models/Category'

import Product from '../models/Product'
import Review from '../models/Review'
import products_view from '../views/producs_view'

interface OrderProps {
  id?: 'ASC'|'DESC'
  price?: 'ASC'|'DESC'
  rating?: 'ASC'|'DESC'
}

export default {

  async index(req: Request, res: Response) {
    const repository = getRepository(Product)

    const categoryName = req.query.category || ''
    const sellerId = req.query.sellerId || ''
    const name = req.query.name || ''
    const order = req.query.order || ''
    
    const pageSize = 3
    const page = Number(req.query.page) || 1
    const min = Number(req.query.min) > 0 ? req.query.min : false
    const max = Number(req.query.max) > 0 ? req.query.max : false

    let categoryFilter = {}
    if (categoryName) {
      const category = await getRepository(Category).findOne({where: { name: categoryName }})
      if (category) categoryFilter = { categoryId: category.id }
    }
    const sellerFilter = sellerId && { sellerId }
    const nameFilter = name && { name: Like(`%${name}%`) }
    const orderFilter:OrderProps =
      order==='lowest'
      ? { price: 'ASC' }
      : order==='highest'
      ? { price: 'DESC' }
      : order==='toprated'
      ? { rating: 'DESC' }
      : { id: 'ASC' }
    
    let priceFilter = {}
    if (min && max)  priceFilter = { price: Between(min, max) }
    if (min && !max) priceFilter = { price: MoreThan(min) }
    if (!min && max) priceFilter = { price: LessThan(max) }

    const count = await repository.count({

      order: orderFilter,
      where: {
        ...categoryFilter,
        ...sellerFilter,
        ...nameFilter,
        ...priceFilter
      }
    })

    const products = await repository.find({

      order: orderFilter,
      where: {
        ...categoryFilter,
        ...sellerFilter,
        ...nameFilter,
        ...priceFilter
      },
      skip: pageSize * (page -1),
      take: pageSize,
      relations: ['images', 'seller']
    })
    
    const pages = Math.ceil(count / pageSize)
    return res.json({products: products_view.renderMany(products), page, pages })
  },

  async show(req: Request, res: Response) {
    const repository = getRepository(Product)
    
    const product = await repository.findOne(req.params.id, { relations: ['images', 'seller'] })
    
    if(!product)
      return res.status(400).json({ message: 'Produto não encontrado' })
    
    const reviewRepository = getRepository(Review)
    const productReviews = await reviewRepository.find({
      where: {entityId: product.id, entityType: 'Product'}
    })

    product.reviews = productReviews

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
  },  


  async reviews(req: Request, res: Response) {
    const repository = getRepository(Product)
    const reviewRepository = getRepository(Review)

    const product = await repository.findOne(req.params.id)
    
    if(!product)
       return res.status(404).json({ message: 'Produto não encontrado' })

    const currentUserReview = await reviewRepository.find({
      where: {entityId: product.id, entityType: 'Product', name: req.user.name }
    })

    if (currentUserReview.length)
      return res.status(404).json({ message: 'Você já avaliou esse produto' })
  
    const review = new Review(product)
    review.name = req.user.name
    review.comment = req.body.comment
    review.rating = Number(req.body.rating)
    
    await reviewRepository.save(review)

    const productReviews = await reviewRepository.find({
      where: {entityId: product.id, entityType: 'Product' }
    })
    
    product.numReviews = productReviews.length
    product.rating = productReviews.reduce((sum, review) => review.rating + sum, 0) / productReviews.length
    
    await repository.save(product)
    
    return res.status(201).json({ review, message: 'Avaliação registrada com sucesso' })
  },


}