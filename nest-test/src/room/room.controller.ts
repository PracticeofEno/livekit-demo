import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { DeleteRoomRequest } from 'livekit-server-sdk/dist/proto/livekit_room';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  listRoom() {
    return this.roomService.listRooms();
  }

  @Get('/:roomName/participants')
  async getParticipants(@Param('roomName') roomName) {
    return await this.roomService.getListParticipants(roomName);
  }

  @Post()
  createRoom(@Query('room') room) {
    return this.roomService.createRoom(room);
  }

  @Delete()
  DeleteRoomRequest(@Query('room') room) {
    return this.roomService.deleteRoom(room);
  }
}
