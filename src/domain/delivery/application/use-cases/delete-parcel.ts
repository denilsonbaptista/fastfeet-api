import { Either, left, right } from '@/core/logic/either'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteParcelUseCaseRequest {
  id: string
}

type DeleteParcelUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteParcelUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
  }: DeleteParcelUseCaseRequest): Promise<DeleteParcelUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    await this.parcelsRepository.delete(parcel)

    return right(null)
  }
}
