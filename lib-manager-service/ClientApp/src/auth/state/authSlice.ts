import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import {
  parseToken,
  retrieveToken,
  setAxiosToken,
  storeToken,
} from "./auth.helpers";
import { AuthStatus, User, UserCredentials, UserType } from "./auth.types";
import { loginApi, registerApi } from "./authApi";

export interface AuthState {
  status: AuthStatus;
  error: string | undefined;
  user: User | undefined;
}

const initialState: AuthState = {
  status: AuthStatus.INIT,
  error: "",
  user: undefined,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (creds: UserCredentials) => {
    const token = await loginApi(creds);

    storeToken(token);
    setAxiosToken(token);

    return token !== null;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (creds: UserCredentials) => {
    const response = await registerApi(creds);

    if (response === null) {
      return false;
    }

    const token = await loginApi(creds);

    storeToken(token);
    setAxiosToken(token);

    return token !== null;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    revalidateAuth: (state) => {
      if (retrieveToken() === null) {
        state.status = AuthStatus.FAILED;
      } else {
        state.status = AuthStatus.SUCCESS;
        state.error = "";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = AuthStatus.SUCCESS;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = AuthStatus.SUCCESS;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { revalidateAuth } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.status === AuthStatus.SUCCESS;

export const selectAuthUserType = (state: RootState) => UserType.LIBRARIAN;

export const selectAuthStatus = (state: RootState) => state.authReducer.status;
export const selectAuthError = (state: RootState) => state.authReducer.error;

export default authSlice.reducer;

export const selectUserInfo = (state: RootState) => parseToken(retrieveToken());
