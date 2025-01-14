import { faker } from '@faker-js/faker'

import {
  Parcel,
  ParcelProps,
} from '@/domain/delivery/enterprise/entities/parcel'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeParcel(
  override: Partial<ParcelProps> = {},
  id?: UniqueEntityID,
) {
  const parcel = Parcel.create(
    {
      recipientId: new UniqueEntityID(),
      status: faker.lorem.sentence(),
      postedAt: faker.date.recent(),
      ...override,
    },
    id,
  )

  return parcel
}
