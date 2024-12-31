import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { UserRole } from './value-objects/user-role'

export interface DeliveryPersonProps {
  name: string
  cpf: string
  role: UserRole
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get role() {
    return this.props.role
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
    this.touch()
  }

  set role(role: UserRole) {
    this.props.role = role
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(
    props: Optional<DeliveryPersonProps, 'role' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const deliveryPerson = new DeliveryPerson(
      {
        ...props,
        role: props.role ?? UserRole.DELIVERY_PERSON,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return deliveryPerson
  }
}
