import { FetchOptions } from '@/core/@types/fetch-options'
import { EntityToCreate, EntityToUpdate } from '@/core/entities/@types/entities'
import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { Meal } from '@/domain/enterprise/meal'
import * as dayjs from 'dayjs'

export class InMemoryMealsRepository extends MealsRepository {
  private readonly meals: Meal[] = []

  async countStrictlyInDietsByUserId(userId: string): Promise<number> {
    const mealsInOrder = this.meals.sort((a, b) =>
      dayjs(b.eatenAt).diff(a.eatenAt, 'ms'),
    )

    let streak = 0
    let bestStreak = 0
    for (const meal of mealsInOrder) {
      if (meal.userId === userId && meal.isInDiet) {
        streak++
      } else {
        streak = 0
      }
      if (streak > bestStreak) {
        bestStreak = streak
      }
    }
    return bestStreak
  }

  async getByUserId(
    userId: string,
    options: FetchOptions<Meal>,
  ): Promise<Meal[]> {
    const { page, limit, orderBy } = options
    let meals = this.meals
      .filter((meal) => meal.userId === userId)
      .slice((page - 1) * limit, page * limit)

    if (orderBy) {
      const [key, value] = Object.entries(orderBy)[0]
      meals = meals.sort((a, b) => {
        if (value === 'asc') {
          return a[key as keyof Meal] > b[key as keyof Meal] ? 1 : -1
        } else {
          return a[key as keyof Meal] < b[key as keyof Meal] ? 1 : -1
        }
      })
    }

    return meals
  }

  async countByUserId(userId: string): Promise<number> {
    return this.meals.filter((meal) => meal.userId === userId).length
  }

  async countInDietsByUserId(userId: string): Promise<number> {
    return this.meals.filter((meal) => meal.userId === userId && meal.isInDiet)
      .length
  }

  async countOutOfDietsByUserId(userId: string): Promise<number> {
    return this.meals.filter((meal) => meal.userId === userId && !meal.isInDiet)
      .length
  }

  async create(entity: EntityToCreate<Meal>): Promise<Meal> {
    const meal = Meal.create(entity)
    this.meals.push(meal)
    return meal
  }

  async update(entity: EntityToUpdate<Meal>): Promise<Meal> {
    const mealToUpdate = entity
    const meal = this.meals.find((meal) => meal.id === mealToUpdate.id)

    if (!meal) {
      throw new Error('Meal not found')
    }

    Object.keys(mealToUpdate).forEach((key) => {
      if (key !== 'id') {
        meal[key] = mealToUpdate[key]
      }
    })

    return meal
  }

  async delete(id: string): Promise<void> {
    const remainMeals = this.meals.filter((meal) => meal.id !== id)
    this.meals.splice(0, this.meals.length, ...remainMeals)
  }

  async exists(id: string): Promise<boolean> {
    return this.meals.some((meal) => meal.id === id)
  }

  async get(id: string): Promise<Meal | null> {
    return this.meals.find((meal) => meal.id === id) ?? null
  }

  async fetch({ page, limit }: { page: 1; limit: 10 }): Promise<Meal[]> {
    return this.meals.slice((page - 1) * limit, page * limit)
  }
}
