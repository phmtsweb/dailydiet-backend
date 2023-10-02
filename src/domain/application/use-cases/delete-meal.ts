import { Either, left, right } from '@/core/either'
import { UseCase } from '@/core/entities/use-case'
import { NotAllowedError, NotFoundError } from '../errors'
import { MealsRepository } from '../repositories/meals-repository'

type DeleteMealUseCaseRequest = {
  mealId: string
  userId: string
}

type DeleteMealUseCaseResponse = Either<NotFoundError | NotAllowedError, void>

export class DeleteMealUseCase extends UseCase<
  DeleteMealUseCaseRequest,
  DeleteMealUseCaseResponse
> {
  constructor(private readonly mealsRepository: MealsRepository) {
    super()
  }

  async execute(
    request: DeleteMealUseCaseRequest,
  ): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.get(request.mealId)

    if (!meal) {
      return left(new NotFoundError('Meal'))
    }

    if (meal.userId !== request.userId) {
      return left(new NotAllowedError())
    }

    await this.mealsRepository.delete(request.mealId)
    return right(undefined)
  }
}
