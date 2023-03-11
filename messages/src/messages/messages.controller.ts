import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller("messages")
export class AppController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  listMessages(): string[] {
    return this.messagesService.getMessages();
  }

  @Get("/:id")
  getMessage(id: string): string {
    return "Something";
  }

  @Post()
  createMessage(@Body() body: any): string {
    console.log(body);
    return ""
  }
}
