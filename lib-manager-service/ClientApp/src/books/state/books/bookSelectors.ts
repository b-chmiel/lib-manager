import { RootState } from "../../../config/store";

export const selectGetBooks = (state: RootState) =>
  state.booksReducer.getBooks.books;
export const selectGetBooksStatus = (state: RootState) =>
  state.booksReducer.getBooks.status;
export const selectGetBooksError = (state: RootState) =>
  state.booksReducer.getBooks.error;
export const selectPostBookStatus = (state: RootState) =>
  state.booksReducer.postBook.status;
export const selectPostBookError = (state: RootState) =>
  state.booksReducer.postBook.error;
export const selectDeleteBookStatus = (state: RootState) =>
  state.booksReducer.deleteBook.status;
export const selectDeleteBookError = (state: RootState) =>
  state.booksReducer.deleteBook.error;
export const selectEditBookStatus = (state: RootState) =>
  state.booksReducer.editBook.status;
export const selectEditBookError = (state: RootState) =>
  state.booksReducer.editBook.error;
export const selectGetBook = (state: RootState, bookId: number) =>
  state.booksReducer.getBooks.books.find((book) => book.bookId === bookId);
