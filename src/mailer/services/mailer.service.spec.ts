import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from '../services/mailer.service'
import { ConfigService } from '@nestjs/config'

describe('MailerController', (): void => {
	let mailerService: MailerService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MailerService],
			providers: [
				{
					provide: MailerService,
					useValue: {
						userCreated: jest.fn()
					}
				},
				{
					provide: ConfigService,
					useValue: {
						getOrThrow: jest.fn()
					}
				}
			]
		}).compile()

		mailerService = module.get<MailerService>(MailerService)
	})

	it('should be defined', (): void => {
		expect(mailerService).toBeDefined()
	})
})
