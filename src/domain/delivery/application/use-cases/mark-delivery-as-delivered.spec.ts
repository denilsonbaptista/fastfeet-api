import { makeParcel } from 'test/factories/make-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { MarkDeliveryAsDeliveredUseCase } from './mark-delivery-as-delivered'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: MarkDeliveryAsDeliveredUseCase

describe('Mark a delivery as delivered', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new MarkDeliveryAsDeliveredUseCase(inMemoryParcelsRepository)
  })

  it('should be possible to mark a delivery as delivered', async () => {
    const parcel = makeParcel({ status: 'pacote retirado' })

    await inMemoryParcelsRepository.create(parcel)

    await sut.execute({
      id: parcel.id.toValue(),
    })

    expect(inMemoryParcelsRepository.items[0]).toMatchObject({
      status: 'delivered',
    })
  })
})
