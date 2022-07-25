import { EmailInUseError, UnexpectedError } from '@monorepo/validation'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
