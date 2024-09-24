import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber } from 'class-validator';
import { SexEnum } from 'src/common/enums/sex.enum';
import { User } from 'src/modules/users/entities/user.entity';

export class RegisterDto extends PartialType(User) {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Email',
    example: 'lov3rinve146@gmail.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Password',
    example: '123456',
  })
  password: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'First name',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Last name',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Phone number',
    example: '0123456789',
  })
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Sexual',
    enum: SexEnum,
  })
  @IsEnum(SexEnum)
  sex: SexEnum;
}
