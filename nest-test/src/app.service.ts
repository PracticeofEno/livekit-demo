import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getToken(room, username): string {
    console.log(room, username);
    console.log(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: username,
      },
    );
    at.addGrant({
      roomJoin: true,
      room: room,
      roomAdmin: true,
      roomCreate: true,
      roomList: true,
      roomRecord: true,
    });
    const token = at.toJwt();
    console.log('access token', token);
    return token;
  }
}
