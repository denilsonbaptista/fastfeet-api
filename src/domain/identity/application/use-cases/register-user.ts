import { Either, left, right } from '@/core/logic/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Admin } from '../../enterprise/entities/admin'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { UserRole } from '../../enterprise/entities/value-objects/user-role'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterUserUseCaseRequest {
  name: string
  cpf: string
  role?: UserRole
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: Admin | DeliveryPerson
  }
>

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    role,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameCPF = await this.usersRepository.findUserByCPF(cpf)

    if (userWithSameCPF) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user =
      role === UserRole.ADMIN
        ? Admin.create({
            name,
            cpf,
            password: hashedPassword,
          })
        : DeliveryPerson.create({
            name,
            cpf,
            password: hashedPassword,
          })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
