import { UseCase } from '@/core/entities/use-case'
import { Meal } from '@/domain/enterprise/meal'
import { NotAllowedError, NotFoundError } from '../errors'
import { Either, left, right } from '@/core/either'
import { MealsRepository } from '../repositories/meals-repository'

type GetMealByIdUseCaseRequest = {
  mealId: string
  userId: string
}

type GetMealByIdUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  { meal: Meal }
>

export class GetMealByIdUseCase extends UseCase<
  GetMealByIdUseCaseRequest,
  GetMealByIdUseCaseResponse
> {
  constructor(private readonly mealsRepository: MealsRepository) {
    super()
    this.mealsRepository = mealsRepository
  }

  async execute(
    request: GetMealByIdUseCaseRequest,
  ): Promise<GetMealByIdUseCaseResponse> {
    const meal = await this.mealsRepository.get(request.mealId)
    if (!meal) {
      return left(new NotFoundError('Meal'))
    }

    if (meal.userId !== request.userId) {
      return left(new NotAllowedError())
    }
    return right({ meal })
  }
}
