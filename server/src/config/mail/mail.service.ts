import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailConfirmationDto } from './dto/mail-confirmation.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailVerification(dto: MailConfirmationDto) {
    await this.mailerService.sendMail({
      to: dto.to,
      text: 'This is a test email',
      subject: 'Email Verification',
      template: './mail-confirmation',
      context: {
        name: dto.name,
        otp: dto.otp,
        link: dto.link,
      },
    });

    return {
      success: true,
    };
  }
}
