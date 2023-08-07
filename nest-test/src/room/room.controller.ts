import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { DeleteRoomRequest } from 'livekit-server-sdk/dist/proto/livekit_room';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {
    }

    @Get()
    listRoom() {
        return this.roomService.getRooms();
    }

    @Post()
    createRoom(@Query('room') room) {
        return this.roomService.createRoom(room)
    }

    @Delete()
    DeleteRoomRequest(@Query('room') room) {
        return this.roomService.deleteRoom(room);
    }
}
