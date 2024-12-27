import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export interface DeliveryPersonRepository {
  deliveryPersonByCPF(cpf: string): Promise<DeliveryPerson | null>
  create(deliveryPerson: DeliveryPerson): Promise<void>
}
