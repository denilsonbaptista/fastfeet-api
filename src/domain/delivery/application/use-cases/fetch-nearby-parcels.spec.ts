import { InMemoryParcelsRepository } from 'test/repositories/in-memory-parcel-repository'
import { FetchNearbyParcels } from './fetch-nearby-parcels'
import { makeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeParcel } from 'test/factories/make-parcel'

let inMemoryParcelsRepository: InMemoryParcelsRepository
let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: FetchNearbyParcels

describe('Fetch Nearby Parcels Use Case', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    inMemoryParcelsRepository = new InMemoryParcelsRepository(
      inMemoryRecipientsRepository,
    )

    sut = new FetchNearbyParcels(inMemoryParcelsRepository)
  })

  it('should by able fetch nearby parcels', async () => {
    // Register of deliveries nearby
    const recipientNearby = makeRecipient(
      {
        latitude: -6.099516,
        longitude: -49.852861,
      },
      new UniqueEntityID('recipiente-nearby'),
    )
    await inMemoryRecipientsRepository.create(recipientNearby)

    const parcelNearby = makeParcel({
      recipientId: recipientNearby.id,
    })
    await inMemoryParcelsRepository.create(parcelNearby)

    // Register of long deliveries
    const recipientLong = makeRecipient(
      {
        latitude: -5.371733,
        longitude: -49.123338,
      },
      new UniqueEntityID('recipiente-long'),
    )
    await inMemoryRecipientsRepository.create(recipientLong)

    const parcelLong = makeParcel({
      recipientId: recipientLong.id,
    })
    await inMemoryParcelsRepository.create(parcelLong)

    // Running the use case
    const result = await sut.execute({
      parcelLatitude: -6.099516,
      parcelLongitude: -49.852861,
    })

    expect(result.value.parcels).toHaveLength(1)
  })
})
