import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/Array'
import { UserTaskDTO } from './dto/user-task.dto'
import { UserTaskRepository } from './repository/user-task.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserTaskService {
  constructor(private userTaskRepository: UserTaskRepository) {}

  async findAll(userId: number) {
    const tasks = await this.userTaskRepository.find({
      where: { user: { id: userId } },
      relations: ['task'],
    })
    return pipe(
      tasks,
      A.map((e) => e.task),
    )
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
