import { Repository } from '@/core/entities/repository'
import { User } from '@prisma/client'

export abstract class UsersRepository extends Repository<User> {
  abstract getByEmail(email: string): Promise<User | null>
}
