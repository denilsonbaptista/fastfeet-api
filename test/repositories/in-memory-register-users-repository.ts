import { RegisterUsersRepository } from '@/domain/identity/application/repositories/register-users-repository'
import { Admin } from '@/domain/identity/enterprise/entities/admin'
import { DeliveryPerson } from '@/domain/identity/enterprise/entities/delivery-person'

export class InMemoryRegisterUsersRepository
  implements RegisterUsersRepository
{
  public items: (Admin | DeliveryPerson)[] = []

  async findUserByCPF(cpf: string): Promise<Admin | DeliveryPerson | null> {
    const user = this.items.find((item) => item.cpf === cpf)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: Admin | DeliveryPerson): Promise<void> {
    this.items.push(user)
  }
}
