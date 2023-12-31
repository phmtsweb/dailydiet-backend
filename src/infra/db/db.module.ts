import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [PrismaService],
  exports: [],
})
export class DbModule {}
