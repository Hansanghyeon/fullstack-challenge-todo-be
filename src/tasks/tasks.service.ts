import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TaskRepository } from './task.repository'
import { TaskDTO } from './dto/task.dto'

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async findAll() {
    return await this.taskRepository.find()
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({ where: { id } })
  }

  async create(newTask: TaskDTO) {
    return await this.taskRepository.save(newTask)
  }

  async remove(id: number) {
    await this.taskRepository.delete(id)
  }

  async update(id: number, task: TaskDTO) {
    const existedTask = await this.taskRepository.findOne({ where: { id } })
    if (existedTask) {
      await this.taskRepository.update(id, task)
    }
    throw new HttpException(
      `${id}의 task를 찾을 수 없습니다`,
      HttpStatus.NOT_FOUND,
    )
  }
}
