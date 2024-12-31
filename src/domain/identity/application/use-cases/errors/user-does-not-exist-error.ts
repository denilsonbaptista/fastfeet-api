import { UseCaseError } from '@/core/errors/use-case-error'

export class UserDoesNotExistError extends Error implements UseCaseError {
  constructor() {
    super('User does not exist.')
  }
}
