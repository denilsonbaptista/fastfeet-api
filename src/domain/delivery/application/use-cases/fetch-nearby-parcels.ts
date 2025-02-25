import { Either, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'

interface FetchNearbyParcelsRequest {
  parcelLatitude: number
  parcelLongitude: number
}

type FetchNearbyParcelsResponse = Either<
  null,
  {
    parcels: Parcel[]
  }
>

export class FetchNearbyParcels {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    parcelLatitude,
    parcelLongitude,
  }: FetchNearbyParcelsRequest): Promise<FetchNearbyParcelsResponse> {
    const parcels = await this.parcelsRepository.findManyParcelsNearby({
      latitude: parcelLatitude,
      longitude: parcelLongitude,
    })

    return right({
      parcels,
    })
  }
}
