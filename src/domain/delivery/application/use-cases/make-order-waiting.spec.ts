import { makeParcel } from 'test/factories/make-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { MakeOrderWaitingUseCase } from './make-order-waiting'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: MakeOrderWaitingUseCase

describe('Make order waiting', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new MakeOrderWaitingUseCase(inMemoryParcelsRepository)
  })

  it('should be possible to mark an order as pending', async () => {
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
