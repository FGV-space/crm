import * as jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY || 'IAmTheOneWhoKnocks!';

export async function jwtVerify(jwt) {
  const check = await jwt.verify(jwt, JWT_KEY);

  return check;
}
