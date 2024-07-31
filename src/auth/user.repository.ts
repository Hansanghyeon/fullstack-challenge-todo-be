import { Repository } from 'typeorm'
import { User } from '~/entities/user'
import { CustomRepository } from './repository/typeorm-ex.decorator'

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
