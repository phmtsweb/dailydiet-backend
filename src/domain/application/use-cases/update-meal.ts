import { Either, left, right } from '@/core/either'
import { UseCase } from '@/core/entities/use-case'
import { NotAllowedError, NotFoundError } from '../errors'
import { Meal } from '@/domain/enterprise/meal'
import { MealsRepository } from '../repositories/meals-repository'

type UpdateMealUseCaseRequest = {
  meal: {
    id: string
    name?: string
    description?: string
    eatenAt?: Date
    isInDiet?: boolean
  }
  userId: string
}

type UpdateMealUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  { meal: Meal }
>

export class UpdateMealUseCase extends UseCase<
  UpdateMealUseCaseRequest,
  UpdateMealUseCaseResponse
> {
  constructor(private readonly mealsRepository: MealsRepository) {
    super()
  }

  async execute(
    request: UpdateMealUseCaseRequest,
  ): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.get(request.meal.id)

    if (!meal) {
      return left(new NotFoundError('Meal'))
    }

    if (meal.userId !== request.userId) {
      return left(new NotAllowedError())
    }

    const { userId, meal: mealData } = request

    const updatedMeal = await this.mealsRepository.update({
      ...mealData,
      userId,
    })

    return right({ meal: updatedMeal })
  }
}
