import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { GetRecipientUseCase } from './get-recipient'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: GetRecipientUseCase

describe('Recipient details', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()

    sut = new GetRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to possible to search for the user by id', async () => {
    const recipient = makeRecipient()

    await inMemoryRecipientsRepository.create(recipient)

    const result = await sut.execute({
      id: recipient.id.toString(),
    })

    expect(result.value).toMatchObject({
      recipient: expect.objectContaining({
        _id: recipient.id,
      }),
    })
  })
})
