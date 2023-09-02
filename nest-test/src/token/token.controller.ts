import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('/guest_live')
  async getGuestLiveToken(@Body('room') room: string): Promise<string> {
    console.log(room);
    return await this.tokenService.getGuestLiveToken(room);
  }
}
