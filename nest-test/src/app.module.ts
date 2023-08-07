import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ConfigModule.forRoot(), RoomModule],
  controllers: [AppController, RoomController],
  providers: [AppService],
})
export class AppModule {}
