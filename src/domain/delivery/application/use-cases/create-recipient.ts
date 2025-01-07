import { RecipientsRepository } from '../repositories/recipients-repository'
import { Either, left, right } from '@/core/logic/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'

interface CreateRecipientUseCaseRequest {
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

type CreateRecipientUseCaseResponse = Either<
  RecipientAlreadyExistsError,
  {
    recipient: Recipient
  }
>

export class CreateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    cpf,
    street,
    number,
    neighborhood,
    complement,
    city,
    state,
    zip,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseResponse> {
    const recipientWithSameCPF =
      await this.recipientsRepository.findRecipientByCPF(cpf)

    if (recipientWithSameCPF) {
      return left(new RecipientAlreadyExistsError())
    }

    const recipient = Recipient.create({
      name,
      cpf,
      street,
      number,
      neighborhood,
      complement,
      city,
      state,
      zip,
    })

    await this.recipientsRepository.create(recipient)

    return right({
      recipient,
    })
  }
}
