import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtPayload } from './jwt-strategy'

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  return req.user as JwtPayload
})
