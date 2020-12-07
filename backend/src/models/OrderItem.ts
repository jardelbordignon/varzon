import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Order from './Order'

@Entity('order_items')
export default class OrderItem {

  @PrimaryGeneratedColumn('increment')
  id: number
  
  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'orderId'})
  order: Order

  @Column()
  productId: number

  @Column()
  productName: string

  @Column()
  productImg: string

  @Column()
  productPrice: number

  @Column()
  qty: number

}