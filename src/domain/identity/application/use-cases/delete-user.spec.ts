import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Register as an administrator user and delivery user.', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to delete a user', async () => {
    const user = makeUser({}, new UniqueEntityID('user-1'))

    await inMemoryUsersRepository.create(user)

    expect(inMemoryUsersRepository.items).toHaveLength(1)

    await sut.execute({ id: 'user-1' })

    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })
})
