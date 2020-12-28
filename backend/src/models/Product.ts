import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import Image from './Image'
import Seller from './Seller'

@Entity('products')
export default class Product {

  constructor(obj?: Product) {
    if (obj) Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  sellerId: number

  @Column()
  name: string

  @Column()
  category: string

  @Column()
  price: number

  @Column()
  countInStock: number

  @Column()
  brand: string

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

  @OneToMany(() => Image, image => image.product, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'productId'})
  images: Image[]

}