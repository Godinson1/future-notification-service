import { Controller, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService, JwtAuthGuard } from 'future-connectors';
import { NotificationService } from '../services/notification.service';
import { UserCreatedDto } from '../dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('order_status_updated')
  @UseGuards(JwtAuthGuard)
  handleOrderStatusUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationService.handleOrderStatusUpdated(data);
    this.rmqService.ack(context as any);
  }

  @EventPattern('user.created')
  handleUserCreated(@Payload() data: UserCreatedDto, @Ctx() context: RmqContext) {
    this.notificationService.handleUserCreated(data);
    this.rmqService.ack(context as any);
  }
}
