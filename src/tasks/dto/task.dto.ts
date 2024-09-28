import { ApiProperty, PartialType } from '@nestjs/swagger'
import { T할일상태 } from '~/constants/할일상태'

export class TaskDTO {
  id: number

  @ApiProperty({
    description: '이름',
  })
  title: string

  @ApiProperty({
    description: '설명',
  })
  description: string

  status: T할일상태
}

export class UpdateTaskDTO extends PartialType(TaskDTO) {}
