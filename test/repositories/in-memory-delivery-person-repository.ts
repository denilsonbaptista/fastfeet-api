import { DeliveryPersonRepository } from '@/domain/identity/application/repositories/delivery-person-repository'
import { DeliveryPerson } from '@/domain/identity/enterprise/entities/delivery-person'

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async deliveryPersonByCPF(cpf: string): Promise<DeliveryPerson | null> {
    const deliveryPerson = this.items.find((item) => item.cpf === cpf)

    if (!deliveryPerson) {
      return null
    }

    return deliveryPerson
  }

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    this.items.push(deliveryPerson)
  }
}
