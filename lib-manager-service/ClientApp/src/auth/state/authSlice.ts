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
      var user = getUserInfo(retrieveToken());
      if (user === undefined) {
        state.status = AuthStatus.FAILED;
        state.error = "";
      } else {
        state.status = AuthStatus.SUCCESS;
        state.user = user;
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
        var user = getUserInfo(retrieveToken());
        if (user === undefined) {
          state.status = AuthStatus.FAILED;
        } else {
          state.status = AuthStatus.SUCCESS;
          state.user = user;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        var user = getUserInfo(retrieveToken());
        if (user === undefined) {
          state.status = AuthStatus.FAILED;
        } else {
          state.status = AuthStatus.SUCCESS;
          state.user = user;
        }
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = AuthStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { revalidateAuth, logout } = authSlice.actions;

export default authSlice.reducer;
