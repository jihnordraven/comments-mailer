import { Controller } from '@nestjs/common'
import { MailerService } from '../services/mailer.service'
import { EventPattern, Payload } from '@nestjs/microservices'

@Controller()
export class MailerController {
	constructor(private readonly mailerService: MailerService) {}

	@EventPattern('user-created')
	public async userCreate(@Payload() email: string): Promise<void> {
		await this.mailerService.userCreated(email)
	}
}
