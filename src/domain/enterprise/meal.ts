import { Optional } from '@/@types/optional'
import { Entity, EntityProps } from '@/core/entities/entity'

type MealProps = {
  userId: string
  name: string
  description: string
  isInDiet: boolean
  eatenAt: Date
}

export class Meal extends Entity<MealProps> {
  private constructor(props: EntityProps<MealProps>) {
    super(props)
  }

  public static create(
    props: Optional<EntityProps<MealProps>, 'id' | 'createdAt' | 'updatedAt'>,
  ): Meal {
    const meal = new Meal({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })
    return meal
  }

  get userId() {
    return this.props.userId
  }

  set userId(userId: string) {
    this.props.userId = userId
    this.touchUpdatedAt()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touchUpdatedAt()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touchUpdatedAt()
  }

  get isInDiet() {
    return this.props.isInDiet
  }

  set isInDiet(isInDiet: boolean) {
    this.props.isInDiet = isInDiet
    this.touchUpdatedAt()
  }

  get eatenAt() {
    return this.props.eatenAt
  }

  set eatenAt(eatenAt: Date) {
    this.props.eatenAt = eatenAt
    this.touchUpdatedAt()
  }
}
