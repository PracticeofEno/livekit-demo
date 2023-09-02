import { Injectable } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
