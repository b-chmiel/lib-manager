export interface Book {
  bookId: number;
  authorName: string;
  bookTitle: string;
  description: string;
  language: BookLanguage;
  publicationDate: string;
  pageCount: number;
  bookCount: number;
}

export enum BookLanguage {
  ENGLISH = "English",
  POLISH = "Polish",
  FRENCH = "French",
  GERMAN = "German",
}
