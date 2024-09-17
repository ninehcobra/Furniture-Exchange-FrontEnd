import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ConfigServiceExt } from 'src/config/config.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigServiceExt,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    // demo
    const tokenPair = this.generateTokenPair({
      userId: '1',
      email: 'test@email.com',
    });

    return tokenPair;
  }

  private generateTokenPair(payload: JwtPayload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_AT_EXPIRATION'),
    });
  }

  private generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_RT_EXPIRATION'),
    });
  }
}
