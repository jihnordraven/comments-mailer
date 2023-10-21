import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SendMailOptions, Transporter, createTransport } from 'nodemailer'
import { bgCyan } from 'colorette'

@Injectable()
export class MailerService {
	private readonly logger: Logger = new Logger(MailerService.name)

	constructor(private readonly config: ConfigService) {}

	private async options(options: SendMailOptions): Promise<void> {
		const transport: Transporter = createTransport({
			service: this.config.getOrThrow<string>('NODEMAILER_SERVICE'),
			auth: {
				user: this.config.getOrThrow<string>('NODEMAILER_USER'),
				pass: this.config.getOrThrow<string>('NODEMAILER_PASS')
			}
		})
		await transport.sendMail(options)
	}

	public async userCreated(email: string): Promise<void> {
		await this.options({
			from: this.config.getOrThrow<string>('NODEMAILER_SERVICE'),
			to: email,
			subject: 'Welcomme!',
			html: '<h1>Thank you for using "Comments App"!</h1>'
		})
		this.logger.log(bgCyan(`Sent an ematil to user: ${email}`))
	}
}
