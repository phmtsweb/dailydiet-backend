export abstract class UseCase<T, K> {
  abstract execute(request: T): Promise<K> | K
}
