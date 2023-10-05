import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { EnvService } from '@/infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  const host = envService.get('HOST')
  await app.listen(port, host)
}
bootstrap()
