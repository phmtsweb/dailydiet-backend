import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository'
import { NotAllowedError } from '../errors'
import { DeleteMealUseCase } from './delete-meal'

describe('Delete Meal Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: DeleteMealUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should delete a meal', async () => {
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
  })

  it('should not delete a meal that is not yours', async () => {
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
