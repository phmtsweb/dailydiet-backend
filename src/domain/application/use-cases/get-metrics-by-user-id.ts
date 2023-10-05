import { Either, right } from '@/core/either'
import { UseCase } from '@/core/entities/use-case'
import { MealsRepository } from '../repositories/meals-repository'

type GetMetricsByUserIdRequest = {
  userId: string
}

type GetMetricsByUserIdResponse = Either<
  void,
  {
    amountOfMeals: number
    amountOfMealsInDiet: number
    amountOfMealsOutOfDiet: number
    bestStreak: number
  }
>

export class GetMetricsByUserId extends UseCase<
  GetMetricsByUserIdRequest,
  GetMetricsByUserIdResponse
> {
  constructor(private readonly mealsRepository: MealsRepository) {
    super()
  }

  async execute({
    userId,
  }: GetMetricsByUserIdRequest): Promise<GetMetricsByUserIdResponse> {
    const amountOfMeals = await this.mealsRepository.countByUserId(userId)
    const amountOfMealsInDiet =
      await this.mealsRepository.countInDietsByUserId(userId)
    const amountOfMealsOutOfDiet =
      await this.mealsRepository.countOutOfDietsByUserId(userId)

    const bestStreak =
      await this.mealsRepository.countStrictlyInDietsByUserId(userId)

    return right({
      amountOfMeals,
      amountOfMealsInDiet,
      amountOfMealsOutOfDiet,
      bestStreak,
    })
  }
}
