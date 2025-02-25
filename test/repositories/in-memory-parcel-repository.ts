import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  ParcelsRepository,
  type FindManyParcelsNearbyParams,
} from '@/domain/delivery/application/repositories/parcels-repository'
import { Parcel } from '@/domain/delivery/enterprise/entities/parcel'
import { InMemoryRecipientsRepository } from './in-memory-recipients-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryParcelsRepository implements ParcelsRepository {
  constructor(private recipientsRepository?: InMemoryRecipientsRepository) {}

  public items: Parcel[] = []

  async findById(id: string): Promise<Parcel | null> {
    const parcel = this.items.find((item) => item.id.toString() === id)

    if (!parcel) {
      return null
    }

    return parcel
  }

  async findByBundleID(bundleID: string): Promise<Parcel | null> {
    const parcel = this.items.find((item) => item.bundleID === bundleID)

    if (!parcel) {
      return null
    }

    return parcel
  }

  async findManyByParcelsDeliveryPersonId(
    deliveryPersonId: string,
    { page }: PaginationParams,
  ): Promise<Parcel[]> {
    const parcels = this.items
      .filter((item) => item.deliveryPersonId.toString() === deliveryPersonId)
      .slice((page - 1) * 20, page * 20)

    return parcels
  }

  async findManyParcelsNearby(
    params: FindManyParcelsNearbyParams,
  ): Promise<Parcel[]> {
    const recipientsNearby = this.recipientsRepository.items.filter((item) => {
      return (
        getDistanceBetweenCoordinates(
          {
            latitude: params.latitude,
            longitude: params.longitude,
          },
          {
            latitude: item.latitude,
            longitude: item.longitude,
          },
        ) <= 10
      )
    })

    const recipientId = recipientsNearby.map((recipient) => recipient.id)

    const parcel = this.items.filter((parcel) =>
      recipientId.includes(parcel.recipientId),
    )

    return parcel
  }

  async create(parcel: Parcel): Promise<void> {
    this.items.push(parcel)
  }

  async save(parcel: Parcel): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === parcel.id)

    this.items[itemIndex] = parcel
  }

  async delete(parcel: Parcel): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === parcel.id)

    this.items.splice(itemIndex, 1)
  }
}
