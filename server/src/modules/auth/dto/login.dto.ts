import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @IsString()
  password: string;
}
