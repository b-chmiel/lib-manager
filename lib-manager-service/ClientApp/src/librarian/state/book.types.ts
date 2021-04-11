export interface Book {
  id: number;
  author: Author;
  title: string;
  subtitle: string;
  description: string;
  language: BookLanguage;
  publicationDate: Date;
  pageCount: number;
  bookSeriesName: string;
  bookSeriesNumber: number;
  count: number;
}

export interface Author {
  id: number;
  name: string;
  surname: string;
}

export enum BookLanguage {
  ENGLISH,
  POLISH,
  FRENCH,
}
