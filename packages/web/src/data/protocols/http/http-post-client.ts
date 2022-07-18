export interface HttpPostClient {
  post: (params: HttpPostClientParams) => Promise<void>
}

export type HttpPostClientParams = {
  url: string
  body?: object
}
