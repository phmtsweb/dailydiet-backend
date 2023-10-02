import { randomUUID } from 'crypto'

export type EntityDefaultProps = {
  id?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export type EntityProps<T> = T & EntityDefaultProps

export abstract class Entity<T> {
  protected props: T
  private _id: string
  private _createdAt: Date
  private _updatedAt?: Date | null

  protected constructor(props: EntityProps<T>) {
    const { id, createdAt, updatedAt, ...rest } = props
    this.props = rest as T
    this._id = id ?? randomUUID()
    this._createdAt = createdAt ?? new Date()
    this._updatedAt = updatedAt ?? null
  }

  get id() {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get createdAt() {
    return this._createdAt
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  public equals(object: Entity<T>): boolean {
    return (
      object !== undefined &&
      object !== null &&
      object instanceof Entity &&
      (this === object || this.id === object.id)
    )
  }

  protected touchUpdatedAt() {
    if (!this._updatedAt) {
      this._updatedAt = new Date()
    }
  }
}
