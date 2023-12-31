import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { ParticipantsModule } from './participants/participants.module';
import { EgressModule } from './egress/egress.module';
import { TokenModule } from './token/token.module';
import { CallbackModule } from './callback/callback.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule, ParticipantsModule, EgressModule, TokenModule, CallbackModule],
  controllers: [AppController, RoomController],
  providers: [AppService],
})
export class AppModule {}
