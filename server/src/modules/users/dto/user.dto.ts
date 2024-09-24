import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { User } from '../entities/user.entity';
import { RoleEnum } from 'src/common/enums/role.enum';
import { SexEnum } from 'src/common/enums/sex.enum';

export class UserDto implements Readonly<UserDto> {
  @IsUUID()
  id: string;

  @IsString()
  email: string;

  @IsBoolean()
  emailVerified: boolean;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsEnum(RoleEnum)
  role: RoleEnum;

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
    user.sex = dto.sex;

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
      sex: entity.sex,
    });
  }

  public static toEntity(dto: Partial<User>) {
    const user = new User();

    user.email = dto.email;
    user.phoneNumber = dto.phoneNumber;
    user.password = dto.password;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.role = dto.role ?? RoleEnum.BUYER;
    user.emailVerified = dto.emailVerified ?? false;
    user.sex = dto.sex;

    return user;
  }
}
