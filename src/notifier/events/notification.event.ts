import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedDto } from '../dto/notification.dto';
import { USER_CREATED } from './constants';
import { MailService } from 'src/mail/mail.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class NotificationEvents {
  constructor(private readonly mailService: MailService, private readonly smsService: SmsService) {}
  @OnEvent(USER_CREATED)
  async handleUserCreatedMail(data: UserCreatedDto) {
    this.mailService.sendWelcomeMail(data);
  }

  // @OnEvent(USER_CREATED)
  // handleUserCreatedSms(data: UserCreatedDto) {
  //   this.smsService.send(data);
  // }
}
