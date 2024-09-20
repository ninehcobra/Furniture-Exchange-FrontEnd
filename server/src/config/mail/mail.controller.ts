import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('demo/send-email')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'lxbach1608@gmail.com',
        },
      },
    },
  })
  send(@Body() body: { email: string }) {
    return this.mailService.sendEmail({
      to: body.email,
      otp: '123456',
      name: 'Bach Le',
      link: 'localhost:3000',
    });
  }
}
