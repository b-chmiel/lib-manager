import { BookLanguage } from "../../state/books/book.types";
import { BookFormData } from "../BookForm/BookForm.types";

export const initialValues: BookFormData = {
  authorName: "",
  bookTitle: "",
  description: "",
  language: BookLanguage.ENGLISH,
  publicationDate: 2005,
  pageCount: 0,
  count: 0,
};
