import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/presentation/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHello(): string {
    return process.env.NODE_ENV;
  }
}
