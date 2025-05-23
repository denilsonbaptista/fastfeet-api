import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AuthenticateUserUseCase } from './use-cases/authenticate-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      name: 'Denis Snow',
      cpf: '999.999.999-99',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      cpf: '999.999.999-99',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
