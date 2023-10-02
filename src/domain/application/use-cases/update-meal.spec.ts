import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository'
import { UpdateMealUseCase } from './update-meal'
import { NotAllowedError } from '../errors'

describe('Update Meal Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: UpdateMealUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(mealsRepository)
  })

  it('should updata a meal', async () => {
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
      meal: {
        id: meal.id,
        name: 'any_name updated',
        isInDiet: false,
      },
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.meal).toBeTruthy()
    expect(response.isRight() && response.value.meal).toMatchObject({
      name: 'any_name updated',
      isInDiet: false,
      description: 'any_description',
    })
  })

  it('should not update a meal that is not yours', async () => {
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
      meal: {
        id: meal.id,
        name: 'any_name updated',
        isInDiet: false,
      },
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.isLeft() && response.value).toBeInstanceOf(NotAllowedError)
  })
})
