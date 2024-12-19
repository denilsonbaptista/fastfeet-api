import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'

interface AdminProps {
  name: string
  cpf: string
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

  static create(props: Optional<AdminProps, 'createdAt'>, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return admin
  }
}
