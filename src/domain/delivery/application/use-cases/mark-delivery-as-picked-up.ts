import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MarkDeliveryAsPickedUpUseCaseRequest {
  id: string
}

type MarkDeliveryAsPickedUpUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parcel: Parcel
  }
>

export class MarkDeliveryAsPickedUpUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
  }: MarkDeliveryAsPickedUpUseCaseRequest): Promise<MarkDeliveryAsPickedUpUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    parcel.status = 'pacote retirado'

    await this.parcelsRepository.save(parcel)

    return right({
      parcel,
    })
  }
}
