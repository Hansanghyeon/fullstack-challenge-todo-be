import { UserTaskDTO } from './dto/user-task.dto'
import { UserTaskRepository } from './repository/user-task.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserTaskService {
  constructor(private userTaskRepository: UserTaskRepository) {}

  async findAll() {
    return await this.userTaskRepository.find()
  }

  // async findUserTask(userId: number, taskId: number) {
  //   return await this.userTaskRepository.findOne({ where: { user } })
  // }

  async create(newUserTask: UserTaskDTO) {
    return await this.userTaskRepository.save(newUserTask)
  }

  // async remove(id: number) {
  //   await this.userTaskRepository.delete(id)
  // }
}
