import { Repository } from 'typeorm'
import { CustomRepository } from '~/auth/repository/typeorm-ex.decorator'
import { Task } from '~/entities/task'

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {}
