import { Either, left, right } from '@/core/logic/either'
import { Admin } from '../../enterprise/entities/admin'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { UsersRepository } from '../repositories/users-repository'
import { UserRole } from '../../enterprise/entities/value-objects/user-role'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

interface EditUserUseCaseRequest {
  id: string
  name: string
  cpf: string
  role?: UserRole
  password: string
}

type EditUserUseCaseResponse = Either<
  UserDoesNotExistError,
  {
    user: Admin | DeliveryPerson
  }
>

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    cpf,
    role,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    user.name = name
    user.cpf = cpf
    user.role = role
    user.password = password

    await this.usersRepository.save(user)

    return right({
      user,
    })
  }
}
