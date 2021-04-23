import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../common/utils/types";
import { RootState } from "../../config/store";
import { Book } from "./book.types";
import { getBooks } from "./librarianApi";

export interface LibrarianState {
  status: RequestStatus;
  error: string | undefined;
  books: Book[];
}

const initialState: LibrarianState = {
  status: RequestStatus.INIT,
  error: "",
  books: [],
};

export const getBooksAsync = createAsyncThunk(
  "librarian/get-books",
  async () => await getBooks()
);

export const librarianSlice = createSlice({
  name: "librarian",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.books = action.payload;
      })
      .addCase(getBooksAsync.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message;
      });
  },
});

export const selectGetBooks = (state: RootState) =>
  state.librarianReducer.books;
export const selectGetBooksStatus = (state: RootState) =>
  state.librarianReducer.status;
export const selectGetBooksError = (state: RootState) =>
  state.librarianReducer.error;

export default librarianSlice.reducer;
