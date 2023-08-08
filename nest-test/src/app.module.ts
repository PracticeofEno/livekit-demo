import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule, ParticipantsModule],
  controllers: [AppController, RoomController],
  providers: [AppService],
})
export class AppModule {}
