export enum Routes {
  LOGIN = "/login",
  REGISTER = "/register",
  HOME_PAGE = "/home",
  BOOK = "/book/:bookId",
  RESERVATIONS = "/reservations",
  RESERVATIONS_CHARTS = "/charts",
}

export enum ApiRoutes {
  LOGIN = "/api/user/login",
  REGISTER = "/api/user/register",
  GET_BOOKS = "/api/book/booklist",
  DELETE_BOOK = "/api/book/delete",
  PUT_BOOK = "/api/book/edit",
  POST_BOOK = "/api/book/add",
  CREATE_RESERVATION = "/api/reservation/creater",
  DELETE_RESERVATION = "/api/reservation/closer",
  GET_RESERVATIONS = "/api/reservation/getuserreserves",
  GET_ALL_RESERVATIONS = "/api/reservation/getallreserves",
  GET_BOOKS_AVAILABLE = "/api/reservation/booksavail",
  GET_RESERVATION_STATS = "/api/reservation/reservestats",
}
