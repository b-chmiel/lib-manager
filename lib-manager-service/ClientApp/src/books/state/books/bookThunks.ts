import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookFormData } from "../../components/BookForm/BookForm.types";
import { transformToBook } from "./books.helpers";
import { deleteBook, editBook, getBook, getBooks, postBook } from "./booksApi";

export const getBooksAsync = createAsyncThunk(
  "books/get-books",
  async () => await getBooks()
);

export const postBookAsync = createAsyncThunk(
  "books/post-book",
  async (formData: BookFormData) => await postBook(transformToBook(formData))
);

export const deleteBookAsync = createAsyncThunk(
  "books/delete-book",
  async (bookId: number) => await deleteBook(bookId)
);

export const editBookAsync = createAsyncThunk(
  "books/edit-book",
  async (formData: BookFormData) => await editBook(transformToBook(formData))
);

export const getBookAsync = createAsyncThunk(
  "books/get-book",
  async (bookId: number) => await getBook(bookId)
);
