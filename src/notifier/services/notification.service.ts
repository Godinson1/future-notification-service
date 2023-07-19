import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedDto } from '../dto/notification.dto';
import { USER_CREATED } from '../events/constants';

@Injectable()
export class NotificationService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  handleOrderStatusUpdated(data: any): void {
    console.log('notification---', data);
  }

  handleUserCreated(data: UserCreatedDto): void {
    this.eventEmitter.emit(USER_CREATED, data);
  }
}
