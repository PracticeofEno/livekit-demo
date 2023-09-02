import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class TokenService {
  constructor(private readonly roomService: RoomService) {}

  async getGuestLiveToken(room: string) {
    console.log(`guestlivEotken = ${room}`);
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: 'guest',
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
