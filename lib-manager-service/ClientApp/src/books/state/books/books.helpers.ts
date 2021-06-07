import { BookFormData } from "../../components/BookForm/BookForm.types";
import { Book } from "./book.types";

export const transformToBook = (formData: BookFormData): Book => {
  return ({
    bookId: formData.bookId ?? 0,
    authorName: formData.authorName,
    bookTitle: formData.bookTitle,
    description: formData.description,
    language: formData.language,
    publicationDate: new Date(Number(formData.publicationDate), 1, 1),
    pageCount: formData.pageCount,
    bookCount: formData.count,
  } as any) as Book;
};
