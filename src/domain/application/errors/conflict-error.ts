import { UseCaseError } from './use-case-error'

export class ConflictError extends UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Resource already exists')
    this.name = 'ConflictError'
  }
}
