import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RecipientProps {
  name: string
  cpf: string
  street: string
  number: number
  neighborhood: string
  complement?: string | null
  city: string
  state: string
  zip: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get complement() {
    return this.props.complement
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get zip() {
    return this.props.zip
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

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  set number(number: number) {
    this.props.number = number
    this.touch()
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
    this.touch()
  }

  set complement(complement: string) {
    this.props.complement = complement
    this.touch()
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  set zip(zip: string) {
    this.props.zip = zip
    this.touch()
  }

  static create(
    props: Optional<RecipientProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return recipient
  }
}
