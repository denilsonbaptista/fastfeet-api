import { ParcelsRepository } from '../repositories/parcels-repository'
import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelAlreadyExistsError } from './errors/parcel-already-exists-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateParcelUseCaseRequest {
  bundleID: string
  recipientId: string
  status: string
}

type CreateParcelUseCaseResponse = Either<
  ParcelAlreadyExistsError,
  {
    parcel: Parcel
  }
>

export class CreateParcelUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    bundleID,
    recipientId,
    status,
  }: CreateParcelUseCaseRequest): Promise<CreateParcelUseCaseResponse> {
    const parcelWithSameBundleID =
      await this.parcelsRepository.findByBundleID(bundleID)

    if (parcelWithSameBundleID) {
      return left(new ParcelAlreadyExistsError())
    }

    const parcel = Parcel.create({
      bundleID,
      recipientId: new UniqueEntityID(recipientId),
      status,
    })

    await this.parcelsRepository.create(parcel)

    return right({
      parcel,
    })
  }
}
