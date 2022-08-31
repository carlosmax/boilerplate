import { ResetPassword } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class RemoteResetPassword implements ResetPassword {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<any, void>
  ) {}

  async reset(params: ResetPassword.Params): Promise<void> {
    const response = await this.httpClient.post({
      url: this.url,
      body: {
        accountId: params.accountId,
        resetToken: params.resetToken,
        newPassword: params.password
      }
    })

    switch (response.statusCode) {
      case HttpStatusCode.noContent:
        return
      default:
        throw new UnexpectedError()
    }
  }
}
