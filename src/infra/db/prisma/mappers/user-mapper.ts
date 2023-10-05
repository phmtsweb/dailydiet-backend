import { User } from '@/domain/enterprise/user'
import { User as PrismaUser } from '@prisma/client'
import { Mapper } from '../../core/mappert'

export class UserMapper implements Mapper<PrismaUser, User> {
  toDomain(entity: PrismaUser): User {
    return User.create({
      id: entity.id,
      email: entity.email,
      name: entity.name,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
  }

  toPersistence(domain: User): PrismaUser {
    return {
      id: domain.id,
      email: domain.email,
      name: domain.name,
      password: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    }
  }
}
