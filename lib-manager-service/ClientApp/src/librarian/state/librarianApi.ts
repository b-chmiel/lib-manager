import { Book } from "./book.types";
import { mockedBooks } from "./librarianApi.mocks";

export function getBooks(): Promise<Book[]> {
  return new Promise<Book[]>((resolve) =>
    setTimeout(() => resolve(mockedBooks), 500)
  );
}
