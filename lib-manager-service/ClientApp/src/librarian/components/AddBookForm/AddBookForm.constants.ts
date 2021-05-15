import { BookLanguage } from "../../state/book.types";
import { AddBookFormData } from "./AddBookForm.types";

export const initialValues: AddBookFormData = {
  authorName: "",
  bookTitle: "",
  description: "",
  language: BookLanguage.ENGLISH,
  publicationDate: 2005,
  pageCount: 0,
  count: 0,
};
