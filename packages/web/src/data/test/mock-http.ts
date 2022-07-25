import { faker } from '@faker-js/faker'
import { HttpPostClient, HttpPostClientParams, HttpResponse, HttpStatusCode } from '../protocols'

export const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.words()
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = { statusCode: HttpStatusCode.ok }

  async post(params: HttpPostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
