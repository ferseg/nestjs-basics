import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller("messages")
export class MessagesController {
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
  createMessage(@Body() body: CreateMessageDto): string {
    console.log(body);
    return ""
  }
}
