import { FetchOptions } from '@/core/@types/fetch-options'
import { Repository } from '@/core/entities/repository'
import { Meal } from '@/domain/enterprise/meal'

export abstract class MealsRepository extends Repository<Meal> {
  abstract getByUserId(userId: string, options?: FetchOptions): Promise<Meal[]>
  abstract countByUserId(userId: string): Promise<number>
  abstract countInDietsByUserId(userId: string): Promise<number>
  abstract countOutOfDietsByUserId(userId: string): Promise<number>
  abstract countStrictlyInDietsByUserId(userId: string): Promise<number>
}
