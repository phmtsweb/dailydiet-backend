import { EntityToCreate, EntityToUpdate } from '@/core/entities/@types/entities'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/user'

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = []

  async create(entity: EntityToCreate<User>): Promise<User> {
    const user = User.create(entity)
    this.users.push(user)
    return user
  }

  async update(entity: EntityToUpdate<User>): Promise<User> {
    const userToUpdate = entity
    const user = this.users.find((user) => user.id === userToUpdate.id)

    if (!user) {
      throw new Error('User not found')
    }

    Object.keys(userToUpdate).forEach((key) => {
      if (key !== 'id') {
        user[key] = userToUpdate[key]
      }
    })

    return user
  }

  async delete(id: string): Promise<void> {
    const remainUsers = this.users.filter((user) => user.id !== id)
    this.users.splice(0, this.users.length, ...remainUsers)
  }

  async exists(id: string): Promise<boolean> {
    return this.users.some((user) => user.id === id)
  }

  async get(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)
    return user ?? null
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user ?? null
  }

  async fetch({ page, limit } = { page: 1, limit: 10 }): Promise<User[]> {
    const users = this.users.slice((page - 1) * limit, page * limit)
    return users
  }
}
