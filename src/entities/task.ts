import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  })
  status: string

  @Column({ type: 'date', nullable: true })
  dueDate: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @OneToMany(() => UserTask, (userTask) => userTask.task)
  // userTasks: UserTask[];
}
