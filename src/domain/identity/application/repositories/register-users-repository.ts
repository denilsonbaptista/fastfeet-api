import { Admin } from '../../enterprise/entities/admin'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export interface RegisterUsersRepository {
  findUserByCPF(cpf: string): Promise<Admin | DeliveryPerson | null>
  create(user: Admin | DeliveryPerson): Promise<void>
}
