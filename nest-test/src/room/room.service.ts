import { Injectable } from '@nestjs/common';
import { ParticipantInfo, Room, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class RoomService {
  private svc: RoomServiceClient;
  private livekitHost = 'http://localhost:7880';
  constructor() {
    this.svc = new RoomServiceClient(
      this.livekitHost,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
    );
  }

  async listRooms(): Promise<Room[]> {
    this.svc.listRooms().then((rooms: Room[]) => {
      console.log('existing rooms', rooms);
    });
    return await this.svc.listRooms();
  }

  async createRoom(name): Promise<Room> {
    const opts = {
      name: name,
      // timeout in seconds
      emptyTimeout: 10 * 60,
      maxParticipants: 20,
    };
    const room = await this.svc.createRoom(opts);
    console.log('room =', room);
    return room;
  }

  deleteRoom(name): Promise<void> {
    this.svc.deleteRoom(name).then(() => {
      console.log('room deleted');
    });
    return;
  }

  async getListParticipants(roomName): Promise<ParticipantInfo[]> {
    const rooms = await this.listRooms();
    let participants;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].name == roomName) {
        participants = await this.svc.listParticipants(rooms[i].name);
        break;
      }
    }
    console.log('participants = ', participants);
    return participants;
  }
}
