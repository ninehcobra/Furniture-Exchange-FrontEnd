import { Role } from 'src/common/enums/role.enum';
import { UserDto } from '../users/dto/user.dto';

export class JwtPayload implements Readonly<JwtPayload>, Partial<UserDto> {
  id: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role: Role;
}
