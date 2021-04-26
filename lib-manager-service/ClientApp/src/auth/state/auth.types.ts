export interface UserCredentials {
  username: string;
  password: string;
}

export enum AuthStatus {
  SUCCESS,
  LOADING,
  FAILED,
  INIT,
}

export enum UserType {
  LIBRARIAN,
  READER,
  UNRECOGNISED,
}

export interface User {
  name: string;
  type: UserType;
}

export interface AuthState {
  status: AuthStatus;
  error: string | undefined;
  user: User | undefined;
}

export interface AuthSuccessResponse {
  token: string;
}

export interface ParsedJwtToken {
  aud: string[];
  email: string;
  exp: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  iss: string;
  jti: string;
  sub: string;
}
