import { AddBookFormData } from "../components/AddBookForm/AddBookForm.types";
import { Book } from "./book.types";
import { mockedBooks } from "./librarianApi.mocks";

export function getBooks(): Promise<Book[]> {
  return new Promise<Book[]>((resolve) =>
    setTimeout(() => resolve(mockedBooks), 500)
  );
}

export function postBook(book: AddBookFormData): Promise<string> {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      console.log("Post book");
      console.log(book);
      resolve("Success");
    }, 100)
  );
}
