import { Body, Controller, Post } from '@nestjs/common';
import { CallbackService } from './callback.service';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post('on_publish')
  async onPublish(@Body() body: any) {
    console.log(`on_publish callback : ${body.name}`);
    return await this.callbackService.onPublish(body.name);
  }
}
