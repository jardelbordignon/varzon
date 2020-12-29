import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'

import Address from './Address'
import Order from './Order'
import Rating from './Rating'
import Seller from './Seller'

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isSeller: boolean
  
  @Column()
  isAdmin: boolean

  @OneToMany(() => Address, address => address.user, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'userId'})
  addresses: Address[]

  @OneToMany(() => Order, order => order.user, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'userId'})
  orders: Order[]
  
  @OneToOne(() => Seller, seller => seller.user, {cascade: ['insert', 'update']})
  seller: Seller
  
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}