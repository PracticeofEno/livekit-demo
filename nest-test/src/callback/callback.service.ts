import { HttpException, Injectable } from '@nestjs/common';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class CallbackService {
  constructor(private readonly roomService: RoomService) {}

  async onPublish(room: string) {
    const roomExist = await this.roomService.checkExistRoom(room);
    if (!roomExist) {
      throw new HttpException('Room not found', 404);
    }
    return;
  }
}
