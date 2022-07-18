import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
