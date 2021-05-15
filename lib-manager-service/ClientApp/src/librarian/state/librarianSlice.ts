import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../common/utils/types";
import { RootState } from "../../config/store";
import { AddBookFormData } from "../components/AddBookForm/AddBookForm.types";
import { Book } from "./book.types";
import { transformToBook } from "./librarian.helpers";
import { deleteBook, getBooks, postBook } from "./librarianApi";

export interface LibrarianState {
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
}

const initialState: LibrarianState = {
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
};

export const getBooksAsync = createAsyncThunk(
  "librarian/get-books",
  async () => await getBooks()
);

export const postBookAsync = createAsyncThunk(
  "librarian/post-book",
  async (formData: AddBookFormData) => await postBook(transformToBook(formData))
);

export const deleteBookAsync = createAsyncThunk(
  "librarian/delete-book",
  async (bookId: number) => await deleteBook(bookId)
);

export const librarianSlice = createSlice({
  name: "librarian",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooksAsync.pending, (state) => {
        state.getBooks.status = RequestStatus.LOADING;
      })
      .addCase(getBooksAsync.fulfilled, (state, action) => {
        state.getBooks.status = RequestStatus.SUCCESS;
        state.getBooks.books = action.payload;
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
      });
  },
});

export const selectGetBooks = (state: RootState) =>
  state.librarianReducer.getBooks.books;
export const selectGetBooksStatus = (state: RootState) =>
  state.librarianReducer.getBooks.status;
export const selectGetBooksError = (state: RootState) =>
  state.librarianReducer.getBooks.error;
export const selectPostBookStatus = (state: RootState) =>
  state.librarianReducer.postBook.status;
export const selectPostBookError = (state: RootState) =>
  state.librarianReducer.postBook.error;
export const selectDeleteBookStatus = (state: RootState) =>
  state.librarianReducer.deleteBook.status;
export const selectDeleteBookError = (state: RootState) =>
  state.librarianReducer.deleteBook.error;

export default librarianSlice.reducer;
