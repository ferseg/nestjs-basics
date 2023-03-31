import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepository) {}

  getMessages(): Promise<string[]> {
    return this.messagesRepo.findAll();
  }

  async findById(id: string): Promise<any> {
    const message = await this.messagesRepo.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  create(body: CreateMessageDto) {
    return this.messagesRepo.create(body.content);
  }
}
