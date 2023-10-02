import { UseCaseError } from './use-case-error'

export class NotFoundError extends UseCaseError {
  constructor(resourceName?: string) {
    const message = resourceName
      ? `${resourceName} not found`
      : 'Resource not found'
    super(message)
    this.name = 'NotFoundError'
  }
}
