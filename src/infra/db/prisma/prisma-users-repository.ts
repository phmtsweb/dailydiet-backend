import { EntityToCreate, EntityToUpdate } from '@/core/entities/@types/entities'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { User } from '@/domain/enterprise/user'
import { UserMapper } from './mappers/user-mapper'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  private readonly userMapper: UserMapper
  constructor(private readonly prisma: PrismaService) {
    this.userMapper = new UserMapper()
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) return null

    return this.userMapper.toDomain(user)
  }

  async create(entity: EntityToCreate<User>): Promise<User> {
    const user = await this.prisma.user.create({ data: entity })

    return this.userMapper.toDomain(user)
  }

  async update(entity: EntityToUpdate<User>): Promise<User> {
    const { id, ...rest } = entity
    const user = await this.prisma.user.update({
      where: { id },
      data: rest,
    })
    return this.userMapper.toDomain(user)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }

  async exists(id: string): Promise<boolean> {
    return (await this.get(id)) !== null
  }

  async get(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) return null

    return this.userMapper.toDomain(user)
  }

  async fetch(options = { page: 1, limit: 10 }): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      skip: options.page,
      take: options.limit,
    })

    return users.map(this.userMapper.toDomain)
  }
}
