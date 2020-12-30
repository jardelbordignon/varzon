import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'

import Product from './Product'

@Entity('brands')
export default class Brand {
  
  constructor(obj?: Brand) {
    if (obj) Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string


  @OneToMany(() => Product, product => product.brand, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'brandId'})
  products: Product[]
  
}
