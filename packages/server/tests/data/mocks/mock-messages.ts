import { EmailSenderProvider } from '@/data/protocols'
import { ResetPasswordEmailTemplate } from '../protocols/messages/email-templates'

export class ResetPasswordEmailProviderSpy
  implements EmailSenderProvider<ResetPasswordEmailTemplate>
{
  params: EmailSenderProvider.Params<ResetPasswordEmailTemplate>

  async send(params: EmailSenderProvider.Params<ResetPasswordEmailTemplate>): Promise<void> {
    this.params = params
  }
}
