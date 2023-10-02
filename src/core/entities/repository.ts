import { FetchOptions } from '../@types/fetch-options'
import {
  EntityDefaultProps,
  EntityToCreate,
  EntityToUpdate,
} from './@types/entities'

export abstract class Repository<T extends EntityDefaultProps> {
  abstract create(entity: EntityToCreate<T>): Promise<T>
  abstract update(entity: EntityToUpdate<T>): Promise<T>
  abstract delete(id: string): Promise<void>
  abstract exists(id: string): Promise<boolean>
  abstract get(id: string): Promise<T | null>
  abstract fetch(options?: FetchOptions): Promise<T[]>
}
