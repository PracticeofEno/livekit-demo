import { Controller, Param, Post } from '@nestjs/common';
import { EgressService } from './egress.service';

@Controller('egress')
export class EgressController {
  constructor(private readonly egressService: EgressService) {}

  @Post('/:room')
  async creeateEgress(@Param('room') room: string) {
    console.log(`start egress for room ${room}`);
    return await this.egressService.creatEgress(room);
  }
}
