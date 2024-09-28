import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { 상수_할일상태 } from '~/constants/할일상태'

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
    enum: Object.values(상수_할일상태),
    default: 상수_할일상태.보류,
  })
  status: string

  @Column({ type: 'date', nullable: true })
  dueDate: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
