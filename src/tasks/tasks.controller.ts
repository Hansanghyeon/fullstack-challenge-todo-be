import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '~/auth/security/auth.guard'
import { TaskDTO } from './dto/task.dto'
import { UserTaskService } from './user-task.service'
import { AppRequest } from '~/auth/dto/app-request.dto'

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private userTaskService: UserTaskService,
  ) {}

  @Get()
  async findAll() {
    return await this.tasksService.findAll()
  }

  @Post()
  async create(@Body() newTask: TaskDTO, @Req() req: AppRequest) {
    // task를 만든다.
    const task = await this.tasksService.create(newTask)
    // UserTask에서 user와 task의 연결을 만든다.
    const newUserTask = {
      id: 0,
      user: req.user,
      task: task,
    }
    await this.userTaskService.create(newUserTask)
    return task
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.remove(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: TaskDTO) {
    this.tasksService.update(id, task)
    return `This action updates a #${id} task`
  }
}
