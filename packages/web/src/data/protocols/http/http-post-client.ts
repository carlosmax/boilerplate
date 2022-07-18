import { HttpResponse } from './http-response'

export interface HttpPostClient {
  post: (params: HttpPostClientParams) => Promise<HttpResponse>
}

export type HttpPostClientParams = {
  url: string
  body?: object
}
