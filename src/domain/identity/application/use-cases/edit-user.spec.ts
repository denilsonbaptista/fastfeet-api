import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditUserUseCase } from './edit-user'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserRole } from '../../enterprise/entities/value-objects/user-role'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Register as an administrator user and delivery user.', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new EditUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit a user', async () => {
    const user = makeUser({}, new UniqueEntityID('user-1'))

    await inMemoryUsersRepository.create(user)

    await sut.execute({
      id: user.id.toString(),
      cpf: '111.111.111-11',
      name: 'John Doe',
      role: UserRole.ADMIN,
      password: '098765',
    })

    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      cpf: '111.111.111-11',
      name: 'John Doe',
      role: 'ADMIN',
      password: '098765',
    })
  })
})
