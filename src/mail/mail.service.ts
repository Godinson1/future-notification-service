import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SUBJECT } from './constants/welcome';
import { UserCreatedDto } from 'src/notifier/dto/notification.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeMail(data: UserCreatedDto): Promise<void> {
    const { email, firstName } = data;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: SUBJECT,
        template: 'welcome',
        context: { name: firstName },
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
