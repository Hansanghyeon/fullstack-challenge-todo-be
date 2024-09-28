import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '~/auth/security/auth.guard'
import { TaskDTO, UpdateTaskDTO } from './dto/task.dto'
import { UserTaskService } from './user-task.service'
import { AppRequest } from '~/auth/dto/app-request.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('할일')
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private userTaskService: UserTaskService,
  ) {}

  @Get()
  @ApiOperation({ summary: '할일 가져오기' })
  async findAll(@Req() req: AppRequest) {
    return await this.userTaskService.findAll(req.user.id)
  }

  @Post()
  @ApiOperation({ summary: '할일 생성' })
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
  @ApiOperation({ summary: '할일 삭제' })
  async remove(@Param('id') id: number, @Req() req: AppRequest) {
    // 가드
    this.userTaskService.validateUserTask(req.user.id, id)

    // userId와 taskId를 받아서 userTask를 찾는다.
    const { id: userId } = req.user
    // userTask에서 task를 삭제한다.
    await this.userTaskService.remove(userId, id)
    // task 자체를 삭제한다.
    await this.tasksService.remove(id)
    return `This action delete a #${id} task`
  }

  @Patch(':id')
  @ApiOperation({ summary: '할일 수정' })
  // @ApiCreatedResponse({ description: '' })
  async patch(
    @Param('id') id: number,
    @Req() req: AppRequest,
    @Body() updateTaskDto: UpdateTaskDTO,
  ) {
    this.userTaskService.validateUserTask(req.user.id, id)

    await this.tasksService.patch(id, updateTaskDto)
    return 'wip'
  }
}
