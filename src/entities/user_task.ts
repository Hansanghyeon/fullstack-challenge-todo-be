import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Task } from './task'
import { User } from './user'

@Entity()
export class UserTask {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  @ManyToOne(() => Task, (task) => task.id)
  task: Task
}
