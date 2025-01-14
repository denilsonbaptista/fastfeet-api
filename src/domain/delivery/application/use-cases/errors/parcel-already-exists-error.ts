import { UseCaseError } from '@/core/errors/use-case-error'

export class ParcelAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Parcel already exists.')
  }
}
