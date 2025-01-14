import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { DeleteRecipientUseCase } from './delete-recipient'
import { makeRecipient } from 'test/factories/make-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: DeleteRecipientUseCase

describe('Delete Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()

    sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to delete a recipient', async () => {
    const recipient = makeRecipient({}, new UniqueEntityID('recipient-1'))

    await inMemoryRecipientsRepository.create(recipient)

    expect(inMemoryRecipientsRepository.items).toHaveLength(1)

    await sut.execute({ id: 'recipient-1' })

    expect(inMemoryRecipientsRepository.items).toHaveLength(0)
  })
})
