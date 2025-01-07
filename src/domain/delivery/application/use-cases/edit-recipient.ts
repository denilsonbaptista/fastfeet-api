import { RecipientsRepository } from '../repositories/recipients-repository'
import { Either, left, right } from '@/core/logic/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'

interface EditRecipientUseCaseRequest {
  id: string
  name: string
  cpf: string
  street: string
  number: number
  neighborhood: string
  complement?: string
  city: string
  state: string
  zip: string
}

type EditRecipientUseCaseResponse = Either<
  RecipientDoesNotExistError,
  {
    recipient: Recipient
  }
>

export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    id,
    name,
    cpf,
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zip,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findRecipientById(id)

    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    recipient.name = name
    recipient.cpf = cpf
    recipient.street = street
    recipient.number = number
    recipient.neighborhood = neighborhood
    recipient.complement = complement
    recipient.city = city
    recipient.state = state
    recipient.zip = zip

    await this.recipientsRepository.save(recipient)

    return right({
      recipient,
    })
  }
}
