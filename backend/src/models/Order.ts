import { Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import OrderItem from './OrderItem'

@Entity('orders')
export default class Order {

  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'oderId'})
  orderItems: OrderItem[]

  @Column()
  paymentMethod: string

  @Column()
  itemsPrice: number

  @Column()
  shippingPrice: number

  @Column()
  taxPrice: number
  
  @Column()
  paidAt: Date
  
  @Column()
  deliveredAt: Date
    
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}