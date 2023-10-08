import jwtDecode from 'jwt-decode'

export default function JwtDecodedToken(refreshToken) {
  return jwtDecode(refreshToken);
}
