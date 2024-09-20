import { IsNotEmpty } from 'class-validator';

export class MailConfirmationDto {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  otp: string;
}
