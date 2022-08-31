import { RemoteRequestResetPassword } from '@/data/usecases'
import { HttpPostClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols'

type SutTypes = {
  sut: RemoteRequestResetPassword
  httpPostClientSpy: HttpPostClientSpy<any, void>
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<any, void>()
  httpPostClientSpy.response.statusCode = HttpStatusCode.noContent
  const sut = new RemoteRequestResetPassword(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteRequestResetPassword', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.email()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.reset(faker.internet.email())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const email = faker.internet.email()
    await sut.reset(email)
    expect(httpPostClientSpy.body).toEqual({ email })
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.reset(faker.internet.email())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.reset(faker.internet.email())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.reset(faker.internet.email())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
