import { Body, Controller, Post } from '@nestjs/common';
import { CallbackService } from './callback.service';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post('on_publish')
  async onPublish(@Body() body: any) {
    console.log(`on_publish callback : ${body.name}`);
    if (body.name == '123' || body.name == '1234') {
      return;
    }
    return await this.callbackService.onPublish(body.name);
  }
}
