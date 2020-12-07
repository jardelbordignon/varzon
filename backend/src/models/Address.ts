import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import User from './User'

@Entity('addresses')
export default class Address {

  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn({ name: 'userId'})
  user: User

}