import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { GetParcelUseCase } from './get-parcel'
import { makeParcel } from 'test/factories/make-parcel'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: GetParcelUseCase

describe('Parcel details', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new GetParcelUseCase(inMemoryParcelsRepository)
  })

  it('should be able to possible to search for the order by the id', async () => {
    const parcel = makeParcel()

    await inMemoryParcelsRepository.create(parcel)

    const result = await sut.execute({
      id: parcel.id.toString(),
    })

    expect(result.value).toMatchObject({
      parcel: expect.objectContaining({
        _id: parcel.id,
      }),
    })
  })
})
