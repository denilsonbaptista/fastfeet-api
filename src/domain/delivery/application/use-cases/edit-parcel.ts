import { Either, left, right } from '@/core/logic/either'
import { Parcel } from '../../enterprise/entities/parcel'
import { ParcelsRepository } from '../repositories/parcels-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditParcelUseCaseRequest {
  id: string
  status: string
}

type EditParcelUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    parcel: Parcel
  }
>

export class EditParcelUseCase {
  constructor(private parcelsRepository: ParcelsRepository) {}

  async execute({
    id,
    status,
  }: EditParcelUseCaseRequest): Promise<EditParcelUseCaseResponse> {
    const parcel = await this.parcelsRepository.findById(id)

    if (!parcel) {
      return left(new ResourceNotFoundError())
    }

    parcel.status = status

    await this.parcelsRepository.save(parcel)

    return right({
      parcel,
    })
  }
}
