import { Module } from '@nestjs/common'
import { EnvModule } from './env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env-schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
