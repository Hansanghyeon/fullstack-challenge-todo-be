import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '~/auth/security/auth.guard'
import { TaskDTO } from './dto/task.dto'

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll() {
    return await this.tasksService.findAll()
  }

  @Post()
  async create(@Body() newTask: TaskDTO) {
    return await this.tasksService.create(newTask)
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
