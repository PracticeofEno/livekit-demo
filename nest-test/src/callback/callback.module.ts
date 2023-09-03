import { Module } from '@nestjs/common';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [RoomModule],
  controllers: [CallbackController],
  providers: [CallbackService],
})
export class CallbackModule {}
