import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'

import User from './User'
import OrderItem from './OrderItem'
import Address from './Address'
import Seller from './Seller'

@Entity('orders')
export default class Order {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  sellerId: number

  @Column()
  paymentMethod: string
  
  @Column()
  paymentId: string
  
  @Column()
  paymentStatus: string
  
  @Column()
  paymentUpdateTime: string
  
  @Column()
  paymentEmailAddress: string
  
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


  @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'oderId'})
  orderItems: OrderItem[]
  
  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'userId'})
  user: User

  @ManyToOne(() => Seller, seller => seller.orders)
  @JoinColumn({ name: 'sellerId'})
  seller: Seller
  
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

}
