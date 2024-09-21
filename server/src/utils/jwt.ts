import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateTokenRSA = (
  payload: object,
  privateKey: string,
  expiresIn: string = '5m',
) => {
  const tokenRSA = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: expiresIn,
  });

  return tokenRSA ?? 'NULL';
};

export const createTokenPair = (payload: object) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '5 days',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const verify = (token: string, publicKey: string) => {
  jwt.verify(token, publicKey, (error, decode) => {
    if (error) {
      console.log('Error verify::', error);
    } else {
      console.log('decode verify::', decode);
    }
  });
  return jwt.verify(token, process.env.JWT_SECRET);
};
