import { AdminsRepository } from '@/domain/identity/application/repositories/admins-repository'
import { Admin } from '@/domain/identity/enterprise/entities/admin'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async adminByCPF(cpf: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.cpf === cpf)

    if (!admin) {
      return null
    }

    return admin
  }

  async create(admin: Admin): Promise<void> {
    this.items.push(admin)
  }
}
