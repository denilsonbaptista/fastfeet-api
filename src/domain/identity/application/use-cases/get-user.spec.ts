import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserUseCase } from './get-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Register as an administrator user and delivery user.', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new GetUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to possible to search for the user by id', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      id: user.id.toString(),
    })

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        _id: user.id,
      }),
    })
  })
})
