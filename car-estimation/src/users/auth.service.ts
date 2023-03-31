import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthServivce {
  constructor(private readonly usersService: UsersService) {}

  async singup(email: string, password: string) {
    console.log('something');
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new ConflictException('The email already exists');
    }
    const hashedPw = await this.hashPassword(password);
    const user = await this.usersService.create(email, hashedPw);
    return user;
  }

  async singin(email: string, password: string) {
    console.log('signing');
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const salt = user.password.split('.')[0];
    const hash = await this.hashPassword(password, salt);
    if (user.password !== hash) {
      throw new UnauthorizedException('email or password incorrect');
    }
    return user;
  }

  async hashPassword(rawPassword: string, salt = '') {
    salt = salt || randomBytes(8).toString('hex');
    const hash = (await scrypt(rawPassword, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }
}
