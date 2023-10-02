export type EntityDefaultProps = {
  id: string
  createdAt: Date
  updatedAt?: Date | null
  equals: (entity: Entity<EntityProps<unknown>>) => boolean
}

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U]

export type EntityToCreate<T> = Omit<T, keyof EntityDefaultProps>
export type EntityToUpdate<T> = { id: string } & AtLeastOne<EntityToCreate<T>>
