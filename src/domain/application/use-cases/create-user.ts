import { Either, left, right } from '@/core/either'
import { User } from '@prisma/client'
import { UseCase } from '@/core/entities/use-case'
import { UsersRepository } from '../repositories/users-repository'
import { ConflictError } from '../errors/conflict-error'

type CreateUserUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  ConflictError,
  {
    user: User
  }
>

export class CreateUserUseCase extends UseCase<
  CreateUserUseCaseRequest,
  CreateUserUseCaseResponse
> {
  constructor(private readonly usersRepository: UsersRepository) {
    super()
  }

  async execute(
    request: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    const { name, email, password } = request
    const user = await this.usersRepository.getByEmail(email)
    if (user) {
      return left(new ConflictError('User already exists'))
    }
    const newUser = await this.usersRepository.create({
      name,
      email,
      password,
    })
    return right({ user: newUser })
  }
}
