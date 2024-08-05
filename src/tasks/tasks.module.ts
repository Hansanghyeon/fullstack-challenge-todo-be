import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '~/entities/task'
import { TypeOrmExModule } from '~/auth/repository/typeorm-ex.module'
import { TaskRepository } from './repository/task.repository'
import { UserTask } from '~/entities/user_task'
import { UserTaskRepository } from './repository/user-task.repository'
import { UserTaskService } from './user-task.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, UserTask]),
    TypeOrmExModule.forCustomRepository([TaskRepository, UserTaskRepository]),
  ],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [TasksController],
  providers: [TasksService, UserTaskService],
})
export class TasksModule {}
