import { Repository } from '@/core/entities/repository'
import { User } from '@/domain/enterprise/user'

export abstract class UsersRepository extends Repository<User> {
  abstract getByEmail(email: string): Promise<User | null>
}
