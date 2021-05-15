import { AddBookFormData } from "../components/AddBookForm/AddBookForm.types";
import { Book } from "./book.types";

export const transformToBook = (formData: AddBookFormData): Book => {
  return ({
    authorName: formData.authorName,
    bookTitle: formData.bookTitle,
    description: formData.description,
    language: formData.language,
    publicationDate: new Date(Number(formData.publicationDate), 1, 1),
    pageCount: formData.pageCount,
    bookCount: formData.count,
  } as any) as Book;
};
