import { faker } from '@faker-js/faker'

import {
  Recipient,
  RecipientProps,
} from '@/domain/delivery/enterprise/entities/recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      cpf: '000.000.000-00',
      street: faker.location.street(),
      number: faker.number.int(100),
      neighborhood: faker.lorem.sentence(3),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      ...override,
    },
    id,
  )

  return recipient
}
