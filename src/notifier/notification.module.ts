import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { RmqModule, AuthModule } from 'future-connectors';
import { AUTH_SERVICE } from 'src/constants';
import { MailModule } from 'src/mail/mail.module';
import { NotificationEvents } from './events/notification.event';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [AuthModule, RmqModule.register({ name: AUTH_SERVICE }), MailModule, SmsModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationEvents],
})
export class NotificationModule {}
