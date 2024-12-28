import { InMemoryRegisterUsersRepository } from 'test/repositories/in-memory-register-users-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterUserUseCase } from './register-user'
import { UserRole } from '../../enterprise/entities/value-objects/user-role'

let inMemoryRegisterUsersRepository: InMemoryRegisterUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register as an administrator user and delivery user.', () => {
  beforeEach(() => {
    inMemoryRegisterUsersRepository = new InMemoryRegisterUsersRepository()

    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryRegisterUsersRepository, fakeHasher)
  })

  it('should be able to register a standard user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryRegisterUsersRepository.items[0],
    })
    expect(inMemoryRegisterUsersRepository.items[0].role).toEqual(
      'DELIVERY PERSON',
    )
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
      user: inMemoryRegisterUsersRepository.items[0],
    })
    expect(inMemoryRegisterUsersRepository.items[0].role).toEqual('ADMIN')
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryRegisterUsersRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
