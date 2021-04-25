import { RootState } from "../../config/store";
import { getUserInfo, retrieveToken } from "./auth.helpers";
import { AuthStatus, UserType } from "./auth.types";

export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.status === AuthStatus.SUCCESS;
export const selectAuthUserType = (state: RootState) =>
  selectUserInfo(state)?.type ?? UserType.UNRECOGNISED;
export const selectAuthStatus = (state: RootState) => state.authReducer.status;
export const selectAuthError = (state: RootState) => state.authReducer.error;
export const selectUserInfo = (state: RootState) =>
  getUserInfo(retrieveToken());
