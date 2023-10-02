import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayload } from './jwt-stratEgy'

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.user as JwtPayload
})
