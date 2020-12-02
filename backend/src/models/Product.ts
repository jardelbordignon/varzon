import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import Image from './Image'

@Entity('products')
export default class Product {

  @PrimaryGeneratedColumn('increment')
  id: number

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

  @OneToMany(() => Image, image => image.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id'})
  images: Image[]
}