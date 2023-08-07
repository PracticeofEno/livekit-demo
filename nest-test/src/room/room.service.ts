import { Injectable } from '@nestjs/common';
import { Room, RoomServiceClient } from 'livekit-server-sdk';

@Injectable()
export class RoomService {
    private svc;
    private livekitHost = "http://localhost:7880"
    constructor() {
        this.svc = new RoomServiceClient(this.livekitHost, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET)
    }

    getRooms(){
      this.svc.listRooms().then((rooms: Room[]) => {
        console.log('existing rooms', rooms);
      });
      return this.svc.listRooms()
    }

    createRoom(name) {
      const opts = {
        name: name,
        // timeout in seconds
        emptyTimeout: 10 * 60,
        maxParticipants: 20,
      };
      let room = this.svc.createRoom(opts)
      room.then((room: Room) => {
        console.log('room created', room);
      });
    }

    deleteRoom(name) {
      this.svc.deleteRoom(name).then(() => {
        console.log('room deleted');
      });
    }
}
