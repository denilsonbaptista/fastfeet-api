import { DeleteParcelUseCase } from './delete-parcel'
import { makeParcel } from 'test/factories/make-parcel'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: DeleteParcelUseCase

describe('Delete Parcel', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new DeleteParcelUseCase(inMemoryParcelsRepository)
  })

  it('should be able to delete a parcel', async () => {
    const parcel = makeParcel({}, new UniqueEntityID('parcel-1'))

    await inMemoryParcelsRepository.create(parcel)

    expect(inMemoryParcelsRepository.items).toHaveLength(1)

    await sut.execute({ id: 'parcel-1' })

    expect(inMemoryParcelsRepository.items).toHaveLength(0)
  })
})
