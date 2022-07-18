import { AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols'

export class RemoteAuthentication {
  constructor(private readonly url: string, private readonly httpClient: HttpPostClient) {}

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: params
    })
    return Promise.resolve()
  }
}
