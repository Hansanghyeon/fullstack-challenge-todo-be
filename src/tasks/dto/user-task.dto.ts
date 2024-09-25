import { Task } from '~/entities/task'
import { User } from '~/entities/user'

// UserTaskDTO는 User와 Task의 관계를 나타내는 DTO이다.
// 그래서 api로 추가할 수없기 떄문에 swagger에 payload 타입을 추가하지 않는다.
export class UserTaskDTO {
  id: number
  user: User
  task: Task
}
