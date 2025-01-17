import { ParcelsRepository } from '@/domain/delivery/application/repositories/parcels-repository'
import { Parcel } from '@/domain/delivery/enterprise/entities/parcel'

export class InMemoryParcelsRepository implements ParcelsRepository {
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
