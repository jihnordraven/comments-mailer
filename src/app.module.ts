import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MailerModule } from './mailer/mailer.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), MailerModule]
})
export class AppModule {}
