import { InMemoryDeliveryPersonRepository } from 'test/repositories/in-memory-delivery-person-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterDeliveryPersonUseCase } from './register-delivery-person'

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let fakeHasher: FakeHasher
let sut: RegisterDeliveryPersonUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()

    fakeHasher = new FakeHasher()

    sut = new RegisterDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      fakeHasher,
    )
  })

  it('should be able to register a delivery person user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryDeliveryPersonRepository.items[0],
    })
  })

  it('should hash delivery person user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveryPersonRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })

  it('should assign the role of DELIVERY PERSON to the created user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000.00',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliveryPersonRepository.items[0].role).toEqual(
      'DELIVERY PERSON',
    )
  })
})
