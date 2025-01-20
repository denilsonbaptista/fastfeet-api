import { makeParcel } from 'test/factories/make-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { MarkDeliveryAsReturnedUseCase } from './mark-delivery-as-returned'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: MarkDeliveryAsReturnedUseCase

describe('Mark a delivery as returned', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new MarkDeliveryAsReturnedUseCase(inMemoryParcelsRepository)
  })

  it('should be possible to mark a delivery as returned', async () => {
    const parcel = makeParcel({ status: 'pacote retirado' })

    await inMemoryParcelsRepository.create(parcel)

    await sut.execute({
      id: parcel.id.toValue(),
    })

    expect(inMemoryParcelsRepository.items[0]).toMatchObject({
      status: 'returned',
    })
  })
})
