import { BookLanguage } from "../../state/book.types";

export interface BookFormData {
  bookId: number;
  authorName: string;
  bookTitle: string;
  description: string;
  language: BookLanguage;
  publicationDate: number;
  pageCount: number;
  count: number;
}
