import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get_lk_token')
  getToken(@Query('room') room, @Query('username') username ): string {
	console.log(room);
	return this.appService.getToken(room, username);
  }
}
