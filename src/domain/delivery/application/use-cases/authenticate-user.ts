import { Either, left, right } from '@/core/logic/either'
import { Encrypter } from '../../../delivery/application/cryptography/encrypter'
import { HashComparer } from '../../../delivery/application/cryptography/hash-comparer'
import { UsersRepository } from '../../../delivery/application/repositories/users-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUserUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findUserByCPF(cpf)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
