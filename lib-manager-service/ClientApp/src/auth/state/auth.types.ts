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
