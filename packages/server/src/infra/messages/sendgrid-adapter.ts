import { EmailSenderProvider } from '@/data/protocols'
import sendGridEmail from '@sendgrid/mail'
import handlebars from 'handlebars'
import path from 'path'
import fs from 'fs'
import { MessageTemplateType } from './message-template-type'

export class SendGridAdapter<T> implements EmailSenderProvider<T> {
  constructor(
    private readonly sendGridKey: string,
    private readonly appEmail: string,
    private readonly messageTemplateType: MessageTemplateType
  ) {
    if (!sendGridKey || !appEmail) {
      throw new Error(`The SendGrid settings are required to send e-mails!`)
    }
  }

  async send(params: EmailSenderProvider.Params<T>): Promise<void> {
    sendGridEmail.setApiKey(this.sendGridKey)

    const msg = {
      to: params.to,
      from: this.appEmail,
      subject: params.subject,
      html: this.getTemplateContent(params.template)
    }

    await sendGridEmail.send(msg)
  }

  private getTemplateContent(template: T): string {
    const fileName = this.getTemplateName()
    const source = fs.readFileSync(path.join(__dirname, fileName), 'utf8')
    const compiledTemplate = handlebars.compile(source)
    return compiledTemplate(template)
  }

  private getTemplateName(): string {
    switch (this.messageTemplateType) {
      case MessageTemplateType.RESET_PASSWORD:
        return './request-reset-password.handlebars'
    }

    return null
  }
}
