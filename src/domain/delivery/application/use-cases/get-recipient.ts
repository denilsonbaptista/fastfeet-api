import { Either, left, right } from '@/core/logic/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'

interface GetRecipientUseCaseRequest {
  id: string
}

type GetRecipientUseCaseResponse = Either<
  RecipientAlreadyExistsError,
  {
    recipient: Recipient
  }
>

export class GetRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    id,
  }: GetRecipientUseCaseRequest): Promise<GetRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findRecipientById(id)

    if (!recipient) {
      return left(new RecipientAlreadyExistsError())
    }

    return right({
      recipient,
    })
  }
}
