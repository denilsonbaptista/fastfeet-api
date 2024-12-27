import { Either, left, right } from '@/core/logic/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'

interface RegisterDeliveryPersonUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterDeliveryPersonUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: DeliveryPerson
  }
>

export class RegisterDeliveryPersonUseCase {
  constructor(
    private deliveryPersonRepository: DeliveryPersonRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliveryPersonUseCaseRequest): Promise<RegisterDeliveryPersonUseCaseResponse> {
    const deliverypersonWithSameCPF =
      await this.deliveryPersonRepository.deliveryPersonByCPF(cpf)

    if (deliverypersonWithSameCPF) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = DeliveryPerson.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliveryPersonRepository.create(user)

    return right({
      user,
    })
  }
}
