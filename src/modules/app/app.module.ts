import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/presentation/filters/exception.filters';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
