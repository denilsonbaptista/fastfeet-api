import { Admin } from '../../enterprise/entities/admin'
import { DeliveryPerson } from '../../enterprise/entities/delivery-person'

export interface UsersRepository {
  findById(id: string): Promise<Admin | DeliveryPerson | null>
  findUserByCPF(cpf: string): Promise<Admin | DeliveryPerson | null>
  create(user: Admin | DeliveryPerson): Promise<void>
  save(user: Admin | DeliveryPerson): Promise<void>
  delete(user: Admin | DeliveryPerson): Promise<void>
}
