export abstract class Mapper<T, U> {
  abstract toDomain(entity: T): U
  abstract toPersistence(domain: U): T
}
