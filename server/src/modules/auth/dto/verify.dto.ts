import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'q is token from url',
  })
  q: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'OTP from user email',
  })
  otp: string;
}
