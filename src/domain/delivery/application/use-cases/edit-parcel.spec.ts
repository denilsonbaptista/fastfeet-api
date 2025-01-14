import { makeParcel } from 'test/factories/make-parcel'
import { EditParcelUseCase } from './edit-parcel'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: EditParcelUseCase

describe('Edit Parcel', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new EditParcelUseCase(inMemoryParcelsRepository)
  })

  it('should be able to edit a parcel', async () => {
    const parcel = makeParcel({ status: 'Em trânsito' })

    await inMemoryParcelsRepository.create(parcel)

    await sut.execute({
      id: parcel.id.toValue(),
      status: 'Entregue',
    })

    expect(inMemoryParcelsRepository.items[0]).toMatchObject({
      status: 'Entregue',
    })
  })
})
