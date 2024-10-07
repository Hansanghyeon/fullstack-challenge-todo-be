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
  @ApiOperation({ summary: '전체 할일 가져오기' })
  async findAll(@Req() req: AppRequest) {
    return await this.userTaskService.findAll({ userId: req.user.id })
  }

  @Get(':id')
  @ApiOperation({ summary: '할일 가져오기' })
  async findOne(@Param('id') taskId: number, @Req() req: AppRequest) {
    // 가드
    try {
      await this.userTaskService.validateUserTask({
        userId: req.user.id,
        taskId,
      })
    } catch (error) {
      return '해당 task는 없습니다'
    }
    // task 데이터 전달
    return await this.tasksService.findOne(taskId)
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
  async remove(@Param('id') taskId: number, @Req() req: AppRequest) {
    const { id: userId } = req.user
    // 가드
    try {
      await this.userTaskService.validateUserTask({ userId, taskId })
    } catch (error) {
      return '해당 task는 없습니다'
    }

    // userTask에서 task를 삭제한다.
    await this.userTaskService.remove({ userId, taskId })
    // task 자체를 삭제한다.
    await this.tasksService.remove(taskId)
    return `This action delete a #${taskId} task`
  }

  @Patch(':id')
  @ApiOperation({ summary: '할일 수정' })
  // @ApiCreatedResponse({ description: '' })
  async patch(
    @Param('id') taskId: number,
    @Req() req: AppRequest,
    @Body() updateTaskDto: UpdateTaskDTO,
  ) {
    const { id: userId } = req.user
    try {
      await this.userTaskService.validateUserTask({ userId, taskId })
    } catch (error) {
      return '해당 task는 없습니다'
    }

    await this.tasksService.patch(taskId, updateTaskDto)
    return `This action updates a #${taskId} task`
  }
}
