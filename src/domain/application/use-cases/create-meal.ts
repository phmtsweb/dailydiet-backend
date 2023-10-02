import { Either, left, right } from '@/core/either'
import { UseCase } from '@/core/entities/use-case'
import { Meal } from '@/domain/enterprise/meal'
import { MealsRepository } from '../repositories/meals-repository'
import { UsersRepository } from '../repositories/users-repository'
import { NotAllowedError } from '../errors/not-allowed-error'

type CreateMealUseCaseRequest = {
  userId: string
  name: string
  description: string
  eatenAt: Date
  isInDiet: boolean
}

type CreateMealUseCaseResponse = Either<NotAllowedError, { meal: Meal }>

export class CreateMealUseCase extends UseCase<
  CreateMealUseCaseRequest,
  CreateMealUseCaseResponse
> {
  constructor(
    private readonly mealsRepository: MealsRepository,
    private readonly usersRepository: UsersRepository,
  ) {
    super()
  }

  async execute(
    request: CreateMealUseCaseRequest,
  ): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.get(request.userId)
    if (!user) {
      return left(new NotAllowedError())
    }
    const meal = await this.mealsRepository.create(request)
    return right({ meal })
  }
}
