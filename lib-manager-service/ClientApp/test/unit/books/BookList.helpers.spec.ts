import { getBookById } from "../../../src/books/components/BookList/BookList.helpers";
import { Book, BookLanguage } from "../../../src/books/state/books/book.types";

const books: Book[] = [
  {
    bookId: 0,
    authorName: "",
    bookTitle: "",
    description: "",
    language: BookLanguage.ENGLISH,
    publicationDate: "",
    pageCount: 0,
    bookCount: 0,
  },
  {
    bookId: 1,
    authorName: "",
    bookTitle: "",
    description: "",
    language: BookLanguage.ENGLISH,
    publicationDate: "",
    pageCount: 0,
    bookCount: 0,
  },
  {
    bookId: 2,
    authorName: "",
    bookTitle: "",
    description: "",
    language: BookLanguage.ENGLISH,
    publicationDate: "",
    pageCount: 0,
    bookCount: 0,
  },
];

describe("BookList.helpers.ts", () => {
  it("should get book by id", () => {
    expect(getBookById(0, books)).toEqual(books[0]);
  });
  it("should return undefined when book not found", () => {
    expect(getBookById(3, books)).toBeUndefined();
  });
});
