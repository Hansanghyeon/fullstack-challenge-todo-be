import { Task } from '~/entities/task'
import { User } from '~/entities/user'

export class UserTaskDTO {
  id: number
  user: User
  task: Task
}
