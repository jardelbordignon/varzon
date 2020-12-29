import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'

@Entity('ratings')
export default class Rating {
  
  constructor(obj?: Rating) {
    if (obj) Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  entityName: string

  @Column()
  entityId: number

  @Column()
  rating: number

  @Column()
  newReviews: number
  
}
