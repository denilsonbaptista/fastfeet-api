import { UsersRepository } from '@/domain/identity/application/repositories/users-repository'
import { Admin } from '@/domain/identity/enterprise/entities/admin'
import { DeliveryPerson } from '@/domain/identity/enterprise/entities/delivery-person'

export class InMemoryUsersRepository implements UsersRepository {
  public items: (Admin | DeliveryPerson)[] = []

  async findById(id: string): Promise<Admin | DeliveryPerson | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

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

  async save(user: Admin | DeliveryPerson): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(user: Admin | DeliveryPerson): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }
}
