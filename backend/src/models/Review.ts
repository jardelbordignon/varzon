import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import Product from './Product'
import Seller from './Seller'


@Entity('reviews')
export default class Review {

  constructor(obj?: Product|Seller) {
    this.entityId = obj?.id
    this.entityType = obj?.constructor.name
  }
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  entityId?: number

  @Column()
  entityType?: string

  @Column()
  name: string

  @Column()
  comment: string

  @Column()
  rating: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // TODO: Pesquisar e implementar polimorfismo
  @ManyToOne(() => Product, entity => entity.reviews)
  @JoinColumn({ name: 'entityId'})
  product: Product

}