import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { selectUserInfo } from "../../../auth/state/authSelectors";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { Routes } from "../../../routing/routes";
import { Book } from "../../state/books/book.types";
import {
  selectDeleteBookError,
  selectDeleteBookStatus,
} from "../../state/books/bookSelectors";
import { deleteBookAsync, getBooksAsync } from "../../state/books/bookThunks";
import { MakeReservationData } from "../../state/reservations/reservation.types";
import { selectGetReservations } from "../../state/reservations/reservationsSelectors";
import {
  deleteReservationAsync,
  getReservationsAsync,
  postReservationAsync,
} from "../../state/reservations/reservationsThunks";
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
  const reservedBooksSelector = useAppSelector(selectGetReservations);

  useEffect(() => {
    handleDeleted();
  }, [status]);

  useEffect(() => {
    dispatch(getReservationsAsync(user?.name ?? ""));
  }, []);

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

  const handleDeleted = () => {
    if (status === RequestStatus.FAILED) {
      errorToast("Delete failed. ", error ?? "");
    } else if (status === RequestStatus.SUCCESS) {
      successToast("Delete success. ");
      dispatch(getBooksAsync());
    }
  };
  const onReservation = (bookId: number) => {
    const userId = user?.name ?? "";
    const reservation = { bookId, userId } as MakeReservationData;
    dispatch(postReservationAsync(reservation)).then(() => {
      dispatch(getReservationsAsync(userId));
    });
  };

  const onCancelReservation = (bookId: number) => {
    const userId = user?.name ?? "";
    dispatch(getReservationsAsync(userId)).then(() => {
      const reservationId = reservedBooksSelector.reservations.find(
        (book) => book.bookId === bookId
      )?.reservationID;

      dispatch(deleteReservationAsync(reservationId ?? -1)).then(() => {
        dispatch(getReservationsAsync(userId));
      });
    });
  };

  const onDetails = (bookId: number) =>
    history.push(Routes.BOOK.replace(":bookId", bookId.toString()));

  return { onDelete, onEdit, onReservation, onCancelReservation, onDetails };
};
