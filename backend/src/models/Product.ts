import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import Category from './Category'
import Seller from './Seller'
import Image from './Image'
import Brand from './Brand'

@Entity('products')
export default class Product {

  constructor(obj?: Product) {
    if (obj) Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  categoryId: number
  
  @Column()
  brandId: number
  
  @Column()
  sellerId: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  countInStock: number

  @Column()
  rating: number

  @Column()
  numReviews: number

  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date
  
  @UpdateDateColumn()
  updatedAt: Date
  

  @ManyToOne(() => Seller, seller => seller.products)
  @JoinColumn({ name: 'sellerId'})
  seller: Seller
  
  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId'})
  category: Category
  
  @ManyToOne(() => Brand, brand => brand.products)
  @JoinColumn({ name: 'brandId'})
  brand: Brand

  @OneToMany(() => Image, image => image.product, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'productId'})
  images: Image[]

}