import { Repository } from 'typeorm'
import { UserAuthority } from '~/entities/user-authority'
import { CustomRepository } from './typeorm-ex.decorator'

@CustomRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
