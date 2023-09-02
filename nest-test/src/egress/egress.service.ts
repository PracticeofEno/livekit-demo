import { Injectable } from '@nestjs/common';
import { EgressClient, StreamOutput, StreamProtocol } from 'livekit-server-sdk';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class EgressService {
  private ec: EgressClient;
  constructor(private readonly roomService: RoomService) {
    this.ec = new EgressClient('http://livekit:7880', 'devkey', 'secret');
  }

  async creatEgress(room: string) {
    console.log(`roomName = ${room}`);
    const output: StreamOutput = {
      protocol: StreamProtocol.RTMP,
      urls: [`rtmp://dev:1935/live/${room}`],
    };

    const info = await this.ec.startRoomCompositeEgress(room, output, {
      layout: 'grid',
    });
    console.log(info);
  }
}
