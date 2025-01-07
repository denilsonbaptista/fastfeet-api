import { UseCaseError } from '@/core/errors/use-case-error'

export class RecipientDoesNotExistError extends Error implements UseCaseError {
  constructor() {
    super('Recipient does not exist.')
  }
}
