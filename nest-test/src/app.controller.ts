import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get_room_token')
  getToken(@Query('room') room, @Query('user') user): string {
    console.log(room);
    return this.appService.getToken(room, user);
  }
}
