import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { UserCreatedDto } from 'src/notifier/dto/notification.dto';
import { SUBJECT } from 'src/mail/constants/welcome';

@Injectable()
export class SmsService {
  client: TwilioClient;
  constructor(private readonly configService: ConfigService) {
    this.client = Twilio(
      this.configService.get<string>('TWILLIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILLIO_AUTH_TOKEN'),
    );
  }

  private async sendSms(options: MessageListInstanceCreateOptions) {
    return this.client.messages.create(options);
  }

  send(data: UserCreatedDto) {
    const options = {
      body: SUBJECT,
      from: this.configService.get<string>('TWILLIO_PHONE_NUMBER'),
      to: data.phoneNumber,
    };
    return this.sendSms(options);
  }
}
