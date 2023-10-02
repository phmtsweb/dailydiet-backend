import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvService } from '../env/env.service'
import { z } from 'zod'

const jwtPayloadSchema = z
  .object({
    sub: z.string(),
  })
  .strict()

export type JwtPayload = z.infer<typeof jwtPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY')
    super({
      algorithm: ['RS256'],
      secretOrKey: Buffer.from(publicKey, 'base64'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload) {
    return jwtPayloadSchema.parse(payload)
  }
}
