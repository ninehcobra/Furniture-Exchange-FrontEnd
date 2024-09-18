import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../jwt-payload';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { ConfigServiceExt } from 'src/modules/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigServiceExt,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
