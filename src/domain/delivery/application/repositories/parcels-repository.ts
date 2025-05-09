import { PaginationParams } from '@/core/repositories/pagination-params'
import { Parcel } from '../../enterprise/entities/parcel'

export interface FindManyParcelsNearbyParams {
  latitude: number
  longitude: number
}

export interface ParcelsRepository {
  findById(id: string): Promise<Parcel | null>
  findByBundleID(bundleID: string): Promise<Parcel | null>
  findManyByParcelsDeliveryPersonId(
    deliveryPersonId: string,
    params: PaginationParams,
  ): Promise<Parcel[]>
  findManyParcelsNearby(params: FindManyParcelsNearbyParams): Promise<Parcel[]>
  create(parcel: Parcel): Promise<void>
  save(parcel: Parcel): Promise<void>
  delete(parcel: Parcel): Promise<void>
}
