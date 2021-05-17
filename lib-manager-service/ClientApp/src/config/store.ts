import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../auth/state/authSlice";
import booksReducer from "../books/state/books/booksSlice";
import reservationsReducer from "../books/state/reservations/reservationsSlice";

export const store = configureStore({
  reducer: { authReducer, booksReducer, reservationsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
