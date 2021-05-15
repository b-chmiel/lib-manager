import { BookLanguage } from "../../state/book.types";

export interface AddBookFormData {
  authorName: string;
  bookTitle: string;
  description: string;
  language: BookLanguage;
  publicationDate: number;
  pageCount: number;
  count: number;
}
