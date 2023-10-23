import { Test, TestingModule } from '@nestjs/testing'
import { MailerController } from './mailer.controller'
import { MailerService } from '../services/mailer.service'

describe('MailerController', (): void => {
	let mailerController: MailerController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MailerController],
			providers: [
				{
					provide: MailerService,
					useValue: {
						userCreated: jest.fn()
					}
				}
			]
		}).compile()

		mailerController = module.get<MailerController>(MailerController)
	})

	it('should be defined', (): void => {
		expect(mailerController).toBeDefined()
	})
})
