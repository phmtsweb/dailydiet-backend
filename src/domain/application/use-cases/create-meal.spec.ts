import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateMealUseCase } from './create-meal'
import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository'
import { NotAllowedError } from '../errors/not-allowed-error'

describe('Create Meal Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: CreateMealUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealsRepository, usersRepository)
  })

  it('should create a new meal', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    const response = await sut.execute({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.meal).toBeTruthy()
  })

  it('should not create a new meal with an invalid userId', async () => {
    const response = await sut.execute({
      userId: 'invalid_user_id',
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
