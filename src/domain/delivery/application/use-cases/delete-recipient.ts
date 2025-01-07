import { Either, left, right } from '@/core/logic/either'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { RecipientDoesNotExistError } from './errors/recipient-does-not-exist-error'

interface DeleteRecipientUseCaseRequest {
  id: string
}

type DeleteRecipientUseCaseResponse = Either<RecipientDoesNotExistError, null>

export class DeleteRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    id,
  }: DeleteRecipientUseCaseRequest): Promise<DeleteRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findRecipientById(id)

    if (!recipient) {
      return left(new RecipientDoesNotExistError())
    }

    await this.recipientsRepository.delete(recipient)

    return right(null)
  }
}
