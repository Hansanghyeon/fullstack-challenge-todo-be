import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { TaskRepository } from './repository/task.repository'
import { TaskDTO, UpdateTaskDTO } from './dto/task.dto'

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async findAll() {
    return await this.taskRepository.find()
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } })
    return task
  }

  async create(newTask: TaskDTO) {
    return await this.taskRepository.save(newTask)
  }

  async remove(id: number) {
    await this.taskRepository.delete(id)
  }

  async patch(id: number, task: UpdateTaskDTO) {
    const existedTask = await this.taskRepository.findOne({ where: { id } })
    // `PATCH` 메서드는 리소스의 부분만을 수정하는 데 쓰입니다.
    const mergedTask = { ...existedTask, ...task }

    if (existedTask) {
      // 업데이트하고
      await this.taskRepository.update(id, mergedTask)
      return
    }
    throw new HttpException(
      `${id}의 task를 찾을 수 없습니다`,
      HttpStatus.NOT_FOUND,
    )
  }

  async put(id: number, task: TaskDTO) {
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
