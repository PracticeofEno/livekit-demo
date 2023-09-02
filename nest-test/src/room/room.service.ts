import { Injectable } from '@nestjs/common';
import { ParticipantInfo, Room, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class RoomService {
  private svc: RoomServiceClient;
  private livekitHost = 'http://teemo-world.link:7880';
  constructor() {
    this.svc = new RoomServiceClient(
      this.livekitHost,
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
    );
  }

  async listRooms(): Promise<Room[]> {
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

  private generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  async checkExistRoom(roomName): Promise<boolean> {
    const rooms = await this.listRooms();
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].name == roomName) {
        return true;
      }
    }
    return false;
  }

  async getStreamKey(): Promise<string> {
    let roomName = this.generateRandomString(10);
    while (await this.checkExistRoom(roomName)) {
      roomName = this.generateRandomString(10);
    }
    return roomName;
  }
}
