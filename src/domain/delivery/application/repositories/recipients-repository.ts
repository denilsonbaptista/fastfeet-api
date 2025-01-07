import { Recipient } from '../../enterprise/entities/recipient'

export interface RecipientsRepository {
  findRecipientById(id: string): Promise<Recipient | null>
  findRecipientByCPF(cpf: string): Promise<Recipient | null>
  create(recipient: Recipient): Promise<void>
  save(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}
