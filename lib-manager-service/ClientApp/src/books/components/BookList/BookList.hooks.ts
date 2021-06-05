import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { selectUserInfo } from "../../../auth/state/authSelectors";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { MakeReservationData } from "../../../reservations/state/reservations/reservation.types";
import {
  getUserReservationsAsync,
  postReservationAsync,
} from "../../../reservations/state/reservations/reservationsThunks";
import { Routes } from "../../../routing/routes";
import { Book } from "../../state/books/book.types";
import {
  selectDeleteBookError,
  selectDeleteBookStatus,
} from "../../state/books/bookSelectors";
import { deleteBookAsync, getBooksAsync } from "../../state/books/bookThunks";
import { BookFormData } from "../BookForm/BookForm.types";
import { getBookById } from "./BookList.helpers";

interface Props {
  books: Book[];
  onOpen: () => void;
  errorToast: (title: string, error: string) => void;
  successToast: (title: string) => void;
  setBookToEdit: React.Dispatch<React.SetStateAction<BookFormData | undefined>>;
}

export const useBookList = ({
  books,
  onOpen,
  errorToast,
  successToast,
  setBookToEdit,
}: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDeleteBookStatus);
  const error = useAppSelector(selectDeleteBookError);
  const user = useAppSelector(selectUserInfo);
  const history = useHistory();

  const handleDeleted = () => {
    if (status === RequestStatus.FAILED) {
      errorToast("Delete failed. ", error ?? "");
    } else if (status === RequestStatus.SUCCESS) {
      successToast("Delete success. ");
      dispatch(getBooksAsync());
    }
  };

  useEffect(() => {
    handleDeleted();
  }, [status]);

  useEffect(() => {
    dispatch(getUserReservationsAsync(user?.name ?? ""));
  }, [dispatch, user?.name]);

  const onDelete = (bookId: number) => dispatch(deleteBookAsync(bookId));

  const onEdit = (bookId: number) => {
    const book = getBookById(bookId, books);
    if (book) {
      setBookToEdit({
        bookId: book.bookId,
        authorName: book.authorName,
        bookTitle: book.bookTitle,
        description: book.description,
        language: book.language,
        publicationDate: new Date(book.publicationDate).getFullYear(),
        pageCount: book.pageCount,
        count: book.bookCount,
      } as BookFormData);
      onOpen();
    }
  };

  const onReservation = (bookId: number) => {
    const userId = user?.name ?? "";
    const reservation = { bookId, userId } as MakeReservationData;
    dispatch(postReservationAsync(reservation)).then(() => {
      dispatch(getUserReservationsAsync(userId));
    });
  };

  const onDetails = (bookId: number) =>
    history.push(Routes.BOOK.replace(":bookId", bookId.toString()));

  return { onDelete, onEdit, onReservation, onDetails };
};
