import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

export class UserDto implements Readonly<UserDto> {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsEnum(Role)
  role: Role;

  public static from(dto: Partial<UserDto>) {
    const user = new UserDto();

    user.id = dto.id;
    user.email = dto.email;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.phoneNumber = dto.phoneNumber;
    user.role = dto.role;
    user.emailVerified = dto.emailVerified;

    return user;
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      phoneNumber: entity.phoneNumber,
      role: entity.role,
      password: entity.password,
      emailVerified: entity.emailVerified,
    });
  }

  public static toEntity(dto: Partial<User>) {
    const user = new User();

    user.email = dto.email;
    user.phoneNumber = dto.phoneNumber;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.role = dto.role ?? Role.BUYER;
    user.emailVerified = dto.emailVerified ?? false;
    user.phoneNumberVerified = dto.phoneNumberVerified ?? false;

    return user;
  }
}
