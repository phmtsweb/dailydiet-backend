import { UseCaseError } from './use-case-error'

export class NotAllowedError extends UseCaseError {
  constructor() {
    super('Action is not allowed')
    this.name = 'NotAllowedError'
  }
}
