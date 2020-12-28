import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import Order from './Order'
import Product from './Product'
import User from './User'

@Entity('sellers')
export default class Seller {
  
  // constructor(obj?: Seller) {
  //   if (obj) Object.assign(this, obj)
  // }
  
  @PrimaryGeneratedColumn('increment')
  id: number
  
  @Column()
  userId: number
  
  @Column()
  name: string
  
  @Column()
  url: string
  
  @Column()
  logo: string
  
  @Column()
  description: string
  
  
  @OneToOne(() => User, user => user.seller)
  @JoinColumn({ name: 'userId'})
  user: User
  
  @OneToMany(() => Product, product => product.seller, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'sellerId'})
  products: Product[]
  
  @OneToMany(() => Order, order => order.seller, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'sellerId'})
  orders: Order[]
  
}
