import { Either, left, right } from '@/core/logic/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Admin } from '../../enterprise/entities/admin'
import { AdminsRepository } from '../repositories/admins-repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterAdminUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterAdminUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: Admin
  }
>

export class RegisterAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const adminWithSameCPF = await this.adminsRepository.adminByCPF(cpf)

    if (adminWithSameCPF) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = Admin.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.adminsRepository.create(user)

    return right({
      user,
    })
  }
}
