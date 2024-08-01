import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '~/entities/task'
import { TypeOrmExModule } from '~/auth/repository/typeorm-ex.module'
import { TaskRepository } from './task.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmExModule.forCustomRepository([TaskRepository]),
  ],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
