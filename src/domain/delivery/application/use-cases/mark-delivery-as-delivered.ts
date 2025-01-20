import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MarkDeliveryAsDeliveredUseCaseRequest {
  id: string
}

type MarkDeliveryAsDeliveredUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parcel: Parcel
  }
>

export class MarkDeliveryAsDeliveredUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
  }: MarkDeliveryAsDeliveredUseCaseRequest): Promise<MarkDeliveryAsDeliveredUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    parcel.status = 'delivered'

    await this.parcelsRepository.save(parcel)

    return right({
      parcel,
    })
  }
}
