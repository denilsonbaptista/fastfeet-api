import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MarkDeliveryAsReturnedUseCaseRequest {
  id: string
}

type MarkDeliveryAsReturnedUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parcel: Parcel
  }
>

export class MarkDeliveryAsReturnedUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
  }: MarkDeliveryAsReturnedUseCaseRequest): Promise<MarkDeliveryAsReturnedUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    parcel.status = 'returned'

    await this.parcelsRepository.save(parcel)

    return right({
      parcel,
    })
  }
}
