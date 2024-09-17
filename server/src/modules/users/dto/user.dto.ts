import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDto implements Readonly<UserDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  public static from(dto: Partial<UserDto>) {
    const user = new UserDto();
    user.id = dto.id;
    user.email = dto.email;
    return user;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      email: entity.email,
    });
  }

  public static toEntity(dto: Partial<User>) {
    const user = new User();
    user.email = dto.email;
    return user;
  }
}
