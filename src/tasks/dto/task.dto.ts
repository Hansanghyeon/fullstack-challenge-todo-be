import { T할일_상태 } from '~/constants/할일_상태'

export class TaskDTO {
  id: number
  title: string
  description: string
  status: T할일_상태
}
