import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MarkDeliveryAsPendingUseCaseRequest {
  id: string
}

type MarkDeliveryAsPendingUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parcel: Parcel
  }
>

export class MarkDeliveryAsPendingUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
  }: MarkDeliveryAsPendingUseCaseRequest): Promise<MarkDeliveryAsPendingUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    parcel.status = 'aguardando'

    await this.parcelsRepository.save(parcel)

    return right({
      parcel,
    })
  }
}
