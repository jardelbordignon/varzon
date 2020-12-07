import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import Address from './Address'
import Order from './Order'

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
  isAdmin: boolean

  @OneToMany(() => Address, address => address.user, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'userId'})
  addresses: Address[]

  
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}