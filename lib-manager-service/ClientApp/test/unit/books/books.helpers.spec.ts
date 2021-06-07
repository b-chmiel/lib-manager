import { BookFormData } from "../../../src/books/components/BookForm/BookForm.types";
import { Book, BookLanguage } from "../../../src/books/state/books/book.types";
import { transformToBook } from "../../../src/books/state/books/books.helpers";

const formData: BookFormData = {
  bookId: 1,
  authorName: "author",
  bookTitle: "title",
  description: "description",
  language: BookLanguage.ENGLISH,
  publicationDate: 2021,
  pageCount: 100,
  count: 10,
};

describe("books.helpers.ts", () => {
  it("should return correct book info", () => {
    const expected: Book = ({
      bookId: 1,
      authorName: "author",
      bookTitle: "title",
      description: "description",
      language: BookLanguage.ENGLISH,
      publicationDate: new Date(2021, 1, 1),
      pageCount: 100,
      bookCount: 10,
    } as any) as Book;

    expect(transformToBook(formData)).toEqual(expected);
  });
});
