import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UserType } from "../../../auth/state/auth.types";
import {
  selectAuthUserType,
  selectUserInfo,
} from "../../../auth/state/authSelectors";
import { Table } from "../../../common/components/Table";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
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
import { BookModalEdit } from "../BookModalEdit";
import { BookListColumns, ReaderListColumns } from "./BookList.constants";
import { getBookById } from "./BookList.helpers";

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDeleteBookStatus);
  const error = useAppSelector(selectDeleteBookError);
  const userType = useAppSelector(selectAuthUserType);
  const toast = useToast();
  const user = useAppSelector(selectUserInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookToEdit, setBookToEdit] = useState<BookFormData | undefined>(
    undefined
  );
  const reservedBooksSelector = useAppSelector(selectGetReservations);

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

  const errorToast = (title: string, error: string) => {
    toast({
      title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const successToast = (title: string) => {
    toast({
      title,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    handleDeleted();
  }, [status]);

  useEffect(() => {
    dispatch(getReservationsAsync(user?.name ?? ""));
  }, []);

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

  const getBookListColumns = () =>
    userType === UserType.LIBRARIAN
      ? BookListColumns(onEdit, onDelete)
      : ReaderListColumns(
          onReservation,
          onCancelReservation,
          reservedBooksSelector?.reservations ?? []
        );

  return (
    <>
      <Table data={books ?? []} columns={getBookListColumns()} />
      <BookModalEdit isOpen={isOpen} onClose={onClose} book={bookToEdit} />
    </>
  );
};
