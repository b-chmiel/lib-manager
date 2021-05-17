import { Book } from "../../state/books/book.types";

export const getBookById = (bookId: number, books: Book[]): Book | undefined =>
  books.find((book) => book.bookId === bookId);
