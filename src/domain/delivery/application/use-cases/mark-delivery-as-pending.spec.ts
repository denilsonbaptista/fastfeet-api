import { makeParcel } from 'test/factories/make-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { MarkDeliveryAsPendingUseCase } from './mark-delivery-as-pending'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: MarkDeliveryAsPendingUseCase

describe('Mark a delivery as pending', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new MarkDeliveryAsPendingUseCase(inMemoryParcelsRepository)
  })

  it('should be possible to mark a delivery as pending', async () => {
    const parcel = makeParcel({ status: 'Em trânsito' })

    await inMemoryParcelsRepository.create(parcel)

    await sut.execute({
      id: parcel.id.toValue(),
    })

    expect(inMemoryParcelsRepository.items[0]).toMatchObject({
      status: 'aguardando',
    })
  })
})
