import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { UserRole } from './value-objects/user-role'

interface AdminProps {
  name: string
  cpf: string
  role: UserRole.ADMIN
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Admin extends Entity<AdminProps> {
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

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(
    props: Optional<AdminProps, 'role' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const admin = new Admin(
      {
        ...props,
        role: props.role ?? UserRole.ADMIN,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return admin
  }
}
