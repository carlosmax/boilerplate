import { RemoteResetPassword } from '@/data/usecases'
import { HttpPostClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols'

type SutTypes = {
  sut: RemoteResetPassword
  httpPostClientSpy: HttpPostClientSpy<any, void>
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, void>()
  httpPostClientSpy.response.statusCode = HttpStatusCode.noContent
  const sut = new RemoteResetPassword(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

const mockParams = {
  accountId: faker.datatype.uuid(),
  resetToken: faker.random.alphaNumeric(32),
  newPassword: faker.random.alphaNumeric(8)
}

describe('RemoteResetPassword', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.email()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.reset(mockParams)
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    await sut.reset(mockParams)
    expect(httpPostClientSpy.body).toEqual(mockParams)
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.reset(mockParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.reset(mockParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.reset(mockParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
