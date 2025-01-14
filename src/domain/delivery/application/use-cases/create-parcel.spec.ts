import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { CreateParcelUseCase } from './create-parcel'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: CreateParcelUseCase

describe('Create Parcel', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new CreateParcelUseCase(inMemoryParcelsRepository)
  })

  it('should be able to create a parcel', async () => {
    const recipient = makeRecipient()

    const result = await sut.execute({
      bundleID: '123456',
      recipientId: recipient.id.toValue(),
      status: 'aguardando',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      parcel: inMemoryParcelsRepository.items[0],
    })
  })
})
