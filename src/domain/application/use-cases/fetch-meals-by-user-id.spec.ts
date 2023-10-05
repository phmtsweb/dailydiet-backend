import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryMealsRepository } from 'test/repositories/in-memory-meals-repository'
import { FetchMealsByUserId } from './fetch-meals-by-user-id'

describe('Fetch Meals By User Id Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let mealsRepository: InMemoryMealsRepository
  let sut: FetchMealsByUserId

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchMealsByUserId(mealsRepository)
  })

  it('should update a meal', async () => {
    const user = await usersRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    await mealsRepository.create({
      userId: 'other_user_id',
      name: 'any_name',
      description: 'any_description',
      eatenAt: new Date(),
      isInDiet: true,
    })

    const response = await sut.execute({
      userId: user.id,
      options: { page: 1, limit: 10 },
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.meals).toBeTruthy()
    expect(response.isRight() && response.value.meals).toHaveLength(3)
  })
})
