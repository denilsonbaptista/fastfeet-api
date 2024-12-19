import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface ParcelProps {
  recipientId: string
  status: string
  postedAt: Date
  withdrawalAt?: Date | null
  deliveryAt?: Date | null
  updatedAt?: Date | null
}

export class Parcel extends Entity<ParcelProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get status() {
    return this.props.status
  }

  get postedAt() {
    return this.props.postedAt
  }

  get withdrawalAt() {
    return this.props.withdrawalAt
  }

  get deliveryAt() {
    return this.props.deliveryAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  withdrawal() {
    this.props.withdrawalAt = new Date()
  }

  delivery() {
    this.props.deliveryAt = new Date()
  }

  static create(props: Optional<ParcelProps, 'postedAt'>, id?: UniqueEntityID) {
    const parcel = new Parcel(
      {
        ...props,
        postedAt: props.postedAt ?? new Date(),
      },
      id,
    )

    return parcel
  }
}
