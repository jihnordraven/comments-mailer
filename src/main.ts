import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { INestMicroservice, Logger } from '@nestjs/common'
import { blue, red } from 'colorette'

const logger: Logger = new Logger('bootstrap')

const RMQ_HOST: string = String(process.env.RMQ_HOST)
const RMQ_QUEUE: string = String(process.env.RMQ_QUEUE)

async function bootstrap() {
	const app: INestMicroservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.RMQ,
			options: {
				urls: [RMQ_HOST],
				queue: RMQ_QUEUE
			}
		})

	await app
		.listen()
		.then(() => logger.log(blue('Microservice is listening')))
		.catch((err: string) =>
			logger.error(red(`Something went wrong... Learn more at: ${err}`))
		)
}
bootstrap()
