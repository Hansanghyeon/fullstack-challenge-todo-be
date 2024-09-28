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

  async findUserTask(userId: number, taskId: number) {
    // userId와 taskId를 받아서 userTask를 찾는다.
    return await this.userTaskRepository.findOne({
      where: { user: { id: userId }, task: { id: taskId } },
    })
  }

  async validateUserTask(userId: number, taskId: number) {
    const userTask = await this.findUserTask(userId, taskId)
    if (!userTask) {
      throw new Error('해당 유저의 task가 아닙니다.')
    }
  }

  async create(newUserTask: UserTaskDTO) {
    return await this.userTaskRepository.save(newUserTask)
  }

  async remove(userId: number, taskId: number) {
    const { id } = await this.findUserTask(userId, taskId)
    // userId와 taskId를 받아서 삭제한다.
    return await this.userTaskRepository.delete(id)
  }
}
