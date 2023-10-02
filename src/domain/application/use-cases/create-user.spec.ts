import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { ConflictError } from '../errors/conflict-error'

describe('Create User Use Case', () => {
  let repository: InMemoryUsersRepository
  let sut: CreateUserUseCase

  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(repository)
  })

  it('should create a new user', async () => {
    const response = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.user).toBeTruthy()
  })

  it('should not create a new user if email already exists', async () => {
    const user = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    }

    await repository.create(user)

    const response = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(ConflictError)
  })
})
