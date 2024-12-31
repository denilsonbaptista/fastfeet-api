import { Either, left, right } from '@/core/logic/either'
import { Admin } from '../../enterprise/entities/admin'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { UsersRepository } from '../repositories/users-repository'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

interface GetUserUseCaseRequest {
  id: string
}

type GetUserUseCaseResponse = Either<
  UserDoesNotExistError,
  {
    user: Admin | DeliveryPerson
  }
>

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    return right({
      user,
    })
  }
}
