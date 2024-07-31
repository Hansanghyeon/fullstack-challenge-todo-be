import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserAuthority } from './user-authority'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_email: string

  @Column()
  password: string

  @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: any[]
}
