import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository'
import { NotAllowedError } from '../errors'
import { GetMealByIdUseCase } from './get-meal-by-id'

describe('Get Meal Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: GetMealByIdUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealByIdUseCase(mealsRepository)
  })

  it('should get a meal', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    const meal = await mealsRepository.create({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    const response = await sut.execute({
      userId: user.id,
      mealId: meal.id,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.meal).toBeTruthy()
    expect(response.isRight() && response.value.meal).toMatchObject({
      id: meal.id,
      userId: user.id,
      name: 'any_name',
      isInDiet: true,
      description: 'any_description',
    })
  })

  it('should not get a meal that is not yours', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    const meal = await mealsRepository.create({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    const response = await sut.execute({
      userId: 'other_user_id',
      mealId: meal.id,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
