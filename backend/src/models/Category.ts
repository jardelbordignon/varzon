import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'

import Product from './Product'

@Entity('categories')
export default class Category {
  
  constructor(obj?: Category) {
    if (obj) Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string


  @OneToMany(() => Product, product => product.category, {cascade: ['insert', 'update']})
  @JoinColumn({ name: 'categoryId'})
  products: Product[]
  
}
