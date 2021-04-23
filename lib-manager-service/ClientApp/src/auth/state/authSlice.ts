import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import { parseToken, retrieveToken, storeToken } from "./auth.helpers";
import { AuthStatus, User } from "./auth.types";
import { loginAsync, registerAsync } from "./authThunks";

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
    logout: (state) => {
      state.status = AuthStatus.INIT;
      state.error = "";
      storeToken(null);
      revalidateAuth();
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

export const { revalidateAuth, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUserInfo = (state: RootState) => parseToken(retrieveToken());
