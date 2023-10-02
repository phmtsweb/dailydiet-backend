import { Either, right } from '@/core/either'
import { UseCase } from '@/core/entities/use-case'
import { Meal } from '@prisma/client'
import { MealsRepository } from '../repositories/meals-repository'

type FetchMealsByUserIdRequest = {
  userId: string
  options?: {
    page: number
    limit: number
  }
}

type FetchMealsByUserIdResponse = Either<void, { meals: Meal[] }>

export class FetchMealsByUserId extends UseCase<
  FetchMealsByUserIdRequest,
  FetchMealsByUserIdResponse
> {
  constructor(private readonly mealsRepository: MealsRepository) {
    super()
  }

  async execute({
    userId,
    options,
  }: FetchMealsByUserIdRequest): Promise<FetchMealsByUserIdResponse> {
    const meals = await this.mealsRepository.getByUserId(userId, options)
    return right({ meals })
  }
}
