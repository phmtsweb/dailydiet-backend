import { Module } from '@nestjs/common'
import { JwtStrategy } from './jwt-strategy'
import { JwtModule } from '@nestjs/jwt'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth-guard'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: (envService: EnvService) => {
        const privateKey = envService.get('JWT_PUBLIC_KEY')
        const publicKey = envService.get('JWT_PUBLIC_KEY')

        return {
          signOptions: {
            algorithm: 'RS256',
          },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
    EnvModule,
  ],
  providers: [
    JwtStrategy,
    EnvService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
