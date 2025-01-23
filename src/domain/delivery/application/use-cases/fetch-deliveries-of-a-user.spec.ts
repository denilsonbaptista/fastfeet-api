import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { FetchDeliveriesOfAUserUseCase } from './fetch-deliveries-of-a-user'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeParcel } from 'test/factories/make-parcel'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let sut: FetchDeliveriesOfAUserUseCase

describe('List the deliveries of a user', () => {
  beforeEach(() => {
    inMemoryParcelsRepository = new InMemoryParcelsRepository()

    sut = new FetchDeliveriesOfAUserUseCase(inMemoryParcelsRepository)
  })

  it('should be able to fetch a user deliveries', async () => {
    const deliveryPerson = makeUser({}, new UniqueEntityID('delivery-person-1'))

    for (let i = 1; i <= 22; i++) {
      await inMemoryParcelsRepository.create(
        makeParcel({
          deliveryPersonId: deliveryPerson.id,
        }),
      )
    }

    const result = await sut.execute({
      deliveryPersonId: 'delivery-person-1',
      page: 1,
    })

    expect(result.value?.parcels).toHaveLength(20)
    expect(result.value?.parcels).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          deliveryPersonId: new UniqueEntityID('delivery-person-1'),
        }),
      ]),
    )
  })

  it('should be able to fetch paginated user deliveries', async () => {
    const deliveryPerson = makeUser({}, new UniqueEntityID('delivery-person-1'))

    for (let i = 1; i <= 22; i++) {
      await inMemoryParcelsRepository.create(
        makeParcel({
          deliveryPersonId: deliveryPerson.id,
        }),
      )
    }

    const result = await sut.execute({
      deliveryPersonId: 'delivery-person-1',
      page: 2,
    })

    expect(result.value?.parcels).toHaveLength(2)
  })
})
