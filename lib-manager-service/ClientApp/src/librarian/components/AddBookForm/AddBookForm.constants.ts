import { BookLanguage } from "../../state/book.types";
import { AddBookFormData } from "./AddBookForm.types";

export const initialValues: AddBookFormData = {
  authorName: "",
  authorSurname: "",
  title: "",
  subtitle: "",
  description: "",
  language: BookLanguage.ENGLISH,
  publicationDate: 2005,
  pageCount: 0,
  bookSeriesName: "",
  count: 0,
};
