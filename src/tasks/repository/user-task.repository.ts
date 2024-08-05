import { Repository } from 'typeorm'
import { CustomRepository } from '~/auth/repository/typeorm-ex.decorator'
import { UserTask } from '~/entities/user_task'

@CustomRepository(UserTask)
export class UserTaskRepository extends Repository<UserTask> {}
