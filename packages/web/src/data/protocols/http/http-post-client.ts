import { HttpResponse } from './http-response'

export interface HttpPostClient<T, R> {
  post: (params: HttpPostClientParams<T>) => Promise<HttpResponse<R>>
}

export type HttpPostClientParams<T> = {
  url: string
  body?: T
}
