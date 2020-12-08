import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import User from './User'

@Entity('addresses')
export default class Address {

  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'userId'})
  user: User

  @Column()
  fullName: string

  @Column()
  street: string
  
  @Column()
  number: string

  @Column()
  complement: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @Column()
  postalCode: string

}