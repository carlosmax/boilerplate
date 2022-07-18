import {
  HttpPostClient,
  HttpPostClientParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = { statusCode: HttpStatusCode.ok }

  async post(params: HttpPostClientParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}
