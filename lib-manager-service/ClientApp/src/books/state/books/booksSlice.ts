import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../../common/utils/types";
import { Book } from "./book.types";
import {
  deleteBookAsync,
  editBookAsync,
  getBooksAsync,
  postBookAsync,
} from "./bookThunks";

export interface BookState {
  getBooks: {
    status: RequestStatus;
    error: string | undefined;
    books: Book[];
  };
  postBook: {
    status: RequestStatus;
    error: string | undefined;
  };
  deleteBook: {
    status: RequestStatus;
    error: string | undefined;
  };
  editBook: {
    status: RequestStatus;
    error: string | undefined;
  };
}

const initialState: BookState = {
  getBooks: {
    status: RequestStatus.INIT,
    error: "",
    books: [],
  },
  postBook: {
    status: RequestStatus.INIT,
    error: "",
  },
  deleteBook: {
    status: RequestStatus.INIT,
    error: "",
  },
  editBook: {
    status: RequestStatus.INIT,
    error: "",
  },
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state) => {
        state.getBooks.status = RequestStatus.LOADING;
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.getBooks.status = RequestStatus.SUCCESS;
        state.getBooks.books = action.payload.sort(
          (a, b) => a.bookId - b.bookId
        );
      })
      .addCase(getBooksAsync.rejected, (state, action) => {
        state.getBooks.status = RequestStatus.FAILED;
        state.getBooks.error = action.error.message;
      })
      .addCase(postBookAsync.pending, (state) => {
        state.postBook.status = RequestStatus.LOADING;
      })
      .addCase(postBookAsync.fulfilled, (state) => {
        state.postBook.status = RequestStatus.SUCCESS;
      })
      .addCase(postBookAsync.rejected, (state, action) => {
        state.postBook.status = RequestStatus.FAILED;
        state.postBook.error = action.error.message;
      })
      .addCase(deleteBookAsync.pending, (state) => {
        state.deleteBook.status = RequestStatus.LOADING;
      })
      .addCase(deleteBookAsync.fulfilled, (state) => {
        state.deleteBook.status = RequestStatus.SUCCESS;
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.deleteBook.status = RequestStatus.FAILED;
        state.deleteBook.error = action.error.message;
      })
      .addCase(editBookAsync.pending, (state) => {
        state.editBook.status = RequestStatus.LOADING;
      })
      .addCase(editBookAsync.fulfilled, (state) => {
        state.editBook.status = RequestStatus.SUCCESS;
      })
      .addCase(editBookAsync.rejected, (state, action) => {
        state.editBook.status = RequestStatus.FAILED;
        state.editBook.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
