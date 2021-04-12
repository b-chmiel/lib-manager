import { Author, Book, BookLanguage } from "./book.types";

const bookCnt = 20;

const mockedAuthor: Author = {
  id: 0,
  name: "John",
  surname: "Smith",
};

export const mockedBooks: Book[] = Array.from(Array(bookCnt).keys()).map(
  (i) => ({
    id: i,
    author: mockedAuthor,
    title: `Sample book ${i}`,
    subtitle: "Sample book subtitle",
    description:
      "Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code 'on the fly' into a book that will instill within you the values of a software craftsman and make you a better programmer―but only if you work at it.",
    language: BookLanguage.ENGLISH,
    publicationDate: new Date("01-04-2008"),
    pageCount: 464,
    bookSeriesName: "",
    bookSeriesNumber: 0,
    count: Math.round(Math.random() * 100),
  })
);
