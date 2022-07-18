import { AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError } from '@/domain/errors'

export class RemoteAuthentication {
  constructor(private readonly url: string, private readonly httpClient: HttpPostClient) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
    }
  }
}
