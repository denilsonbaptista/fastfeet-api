import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin, AdminProps } from '@/domain/delivery/enterprise/entities/admin'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/delivery/enterprise/entities/delivery-person'
import { UserRole } from '@/domain/delivery/enterprise/entities/value-objects/user-role'

export function makeUser(
  override: Partial<AdminProps | DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const user =
    override.role === UserRole.ADMIN
      ? Admin.create(
          {
            cpf: '000.000.000-00',
            name: faker.person.fullName(),
            password: '123456',
            role: UserRole.ADMIN,
            ...override,
          },
          id,
        )
      : DeliveryPerson.create(
          {
            cpf: '000.000.000-00',
            name: faker.person.fullName(),
            password: '123456',
            ...override,
          },
          id,
        )

  return user
}
