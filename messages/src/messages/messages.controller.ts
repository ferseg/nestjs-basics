import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  listMessages(): Promise<any> {
    return this.messagesService.getMessages();
  }

  @Get('/:id')
  getMessage(@Param('id') id: string): Promise<any> {
    return this.messagesService.findById(id);
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body);
  }
}
