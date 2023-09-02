import { Module } from '@nestjs/common';
import { EgressController } from './egress.controller';
import { EgressService } from './egress.service';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [RoomModule],
  controllers: [EgressController],
  providers: [EgressService],
})
export class EgressModule {}
