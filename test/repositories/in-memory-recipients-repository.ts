import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async findRecipientById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.id.toString() === id)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async findRecipientByCPF(cpf: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.cpf === cpf)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipient.id)

    this.items[itemIndex] = recipient
  }

  async delete(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipient.id)

    this.items.splice(itemIndex, 1)
  }
}
