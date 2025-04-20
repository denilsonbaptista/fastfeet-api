import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterUserUseCase } from './use-cases/register-user'
import { UserRole } from '../../enterprise/entities/value-objects/user-role'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register as an administrator user and delivery user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a standard user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
    expect(inMemoryUsersRepository.items[0].role).toEqual('DELIVERY PERSON')
  })

  it('should be able to register an admin user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      role: UserRole.ADMIN,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
    expect(inMemoryUsersRepository.items[0].role).toEqual('ADMIN')
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })
})
