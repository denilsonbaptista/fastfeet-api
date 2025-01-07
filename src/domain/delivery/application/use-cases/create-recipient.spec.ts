import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { CreateRecipientUseCase } from './create-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: CreateRecipientUseCase

describe('Register as an administrator user and delivery user.', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()

    sut = new CreateRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to create a recipient', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000-00',
      street: 'vovo',
      number: 123,
      neighborhood: 'rinron',
      city: 'Vrummmm',
      state: 'run',
      zip: '000000-000',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: inMemoryRecipientsRepository.items[0],
    })
  })
})
