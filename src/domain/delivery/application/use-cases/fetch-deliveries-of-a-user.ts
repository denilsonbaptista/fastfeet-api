import { Either, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'

interface FetchDeliveriesOfAUserUseCaseRequest {
  deliveryPersonId: string
  page: number
}

type FetchDeliveriesOfAUserUseCaseResponse = Either<
  null,
  {
    parcels: Parcel[]
  }
>

export class FetchDeliveriesOfAUserUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    deliveryPersonId,
    page,
  }: FetchDeliveriesOfAUserUseCaseRequest): Promise<FetchDeliveriesOfAUserUseCaseResponse> {
    const parcels =
      await this.parcelsRepository.findManyByParcelsDeliveryPersonId(
        deliveryPersonId,
        {
          page,
        },
      )

    return right({
      parcels,
    })
  }
}
