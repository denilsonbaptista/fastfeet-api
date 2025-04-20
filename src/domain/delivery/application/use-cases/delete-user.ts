import { Either, left, right } from '@/core/logic/either'
import { UsersRepository } from '../../../delivery/application/repositories/users-repository'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Either<UserDoesNotExistError, null>

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    await this.usersRepository.delete(user)

    return right(null)
  }
}
