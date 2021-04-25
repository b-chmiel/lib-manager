import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, retrieveToken, storeToken } from "./auth.helpers";
import { AuthState, AuthStatus } from "./auth.types";
import { loginAsync, registerAsync } from "./authThunks";

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
      var token = retrieveToken();
      if (token === null) {
        state.status = AuthStatus.FAILED;
      } else {
        state.status = AuthStatus.SUCCESS;
        state.user = getUserInfo(token);
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
        state.user = getUserInfo(retrieveToken());
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
        state.user = getUserInfo(retrieveToken());
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { revalidateAuth, logout } = authSlice.actions;

export default authSlice.reducer;
