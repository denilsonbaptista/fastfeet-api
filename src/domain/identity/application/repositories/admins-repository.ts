import { Admin } from '../../enterprise/entities/admin'

export interface AdminsRepository {
  adminByCPF(cpf: string): Promise<Admin | null>
  create(admin: Admin): Promise<void>
}
