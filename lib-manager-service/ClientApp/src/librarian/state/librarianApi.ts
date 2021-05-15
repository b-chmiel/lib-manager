import axios from "axios";
import { ApiRoutes } from "../../routing/routes";
import { Book } from "./book.types";

export function getBooks(): Promise<Book[]> {
  return axios
    .get(ApiRoutes.GET_BOOKS)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function postBook(book: Book): Promise<string> {
  return axios
    .post(ApiRoutes.POST_BOOK, { ...book })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}
