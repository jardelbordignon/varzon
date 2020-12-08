import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import User from './User'
import OrderItem from './OrderItem'

@Entity('orders')
export default class Order {

  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'oderId'})
  orderItems: OrderItem[]

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'userId'})
  user: User

  @Column()
  paymentMethod: string

  @Column()
  itemsPrice: number

  @Column()
  shippingPrice: number

  @Column()
  taxPrice: number
  
  @Column({nullable: true, default: () => 'null'})
  paidAt: Date
  
  @Column({nullable: true, default: () => 'null'})
  deliveredAt: Date
    
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}