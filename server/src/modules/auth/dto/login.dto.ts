import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Email',
    example: 'lov3rinve146@gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @IsString()
  password: string;
}
