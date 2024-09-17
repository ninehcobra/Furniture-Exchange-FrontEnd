export class JwtPayload implements Readonly<JwtPayload> {
  userId: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
}
