import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  getMessages(): string[] {
    return ['Hello World!'];
  }
}
