import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  password: string;
}
