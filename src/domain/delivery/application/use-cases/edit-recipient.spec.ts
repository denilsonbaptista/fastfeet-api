import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { EditRecipientUseCase } from './edit-recipient'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: EditRecipientUseCase

describe('Edit Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()

    sut = new EditRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to edit a recipient', async () => {
    const recipient = makeRecipient(
      { name: 'Denilson Lourenço' },
      new UniqueEntityID('recipient-1'),
    )

    await inMemoryRecipientsRepository.create(recipient)

    await sut.execute({
      id: recipient.id.toValue(),
      name: 'Denilson Baptista',
      cpf: recipient.cpf,
      city: recipient.city,
      neighborhood: recipient.neighborhood,
      complement: 'house of the yellow gate',
      number: recipient.number,
      state: recipient.state,
      street: recipient.street,
      zip: recipient.zip,
    })

    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      name: 'Denilson Baptista',
      complement: 'house of the yellow gate',
    })
  })
})
