import { makeParcel } from 'test/factories/make-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { MarkDeliveryAsPickedUpUseCase } from './mark-delivery-as-picked-up'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: MarkDeliveryAsPickedUpUseCase

describe('Mark a delivery as picked up', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new MarkDeliveryAsPickedUpUseCase(inMemoryParcelsRepository)
  })

  it('should be possible to mark a delivery as picked up', async () => {
    const parcel = makeParcel({ status: 'aguardando' })

    await inMemoryParcelsRepository.create(parcel)

    await sut.execute({
      id: parcel.id.toValue(),
    })

    expect(inMemoryParcelsRepository.items[0]).toMatchObject({
      status: 'pacote retirado',
    })
  })
})
