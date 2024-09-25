import { ApiProperty } from '@nestjs/swagger'
import { T할일_상태 } from '~/constants/할일_상태'

export class TaskDTO {
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  status: T할일_상태
}
