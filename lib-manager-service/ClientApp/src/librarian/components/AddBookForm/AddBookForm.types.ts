import { BookLanguage } from "../../state/book.types";

export interface AddBookFormData {
  authorName: string;
  authorSurname: string;
  title: string;
  subtitle: string;
  description: string;
  language: BookLanguage;
  publicationDate: number;
  pageCount: number;
  bookSeriesName: string;
  count: number;
}
