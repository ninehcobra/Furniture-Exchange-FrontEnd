import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  password: string;

  @ApiProperty({ required: true, type: 'string', description: 'First name' })
  firstName: string;

  @ApiProperty({ required: true, type: 'string', description: 'Last name' })
  lastName: string;

  @ApiProperty({ required: true, type: 'string', description: 'Phone number' })
  @IsPhoneNumber('VN')
  phoneNumber: string;
}
