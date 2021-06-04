import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserType } from "../../../auth/state/auth.types";
import { selectAuthUserType } from "../../../auth/state/authSelectors";
import { Table } from "../../../common/components/Table";
import { useStatusToasts } from "../../../common/hooks/useStatusToasts";
import { useAppSelector } from "../../../config/hooks";
import { isReservationCurrent } from "../../helpers/isReservationCurrent";
import { Book } from "../../state/books/book.types";
import { selectGetReservations } from "../../state/reservations/reservationsSelectors";
import { BookFormData } from "../BookForm/BookForm.types";
import { BookModalEdit } from "../BookModalEdit";
import { BookListColumns, ReaderListColumns } from "./BookList.constants";
import { useBookList } from "./BookList.hooks";

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  const userType = useAppSelector(selectAuthUserType);
  const reservedBooksSelector = useAppSelector(selectGetReservations);
  const [bookToEdit, setBookToEdit] = useState<BookFormData | undefined>(
    undefined
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { errorToast, successToast } = useStatusToasts();

  const { onDelete, onEdit, onReservation, onDetails } = useBookList({
    books,
    onOpen,
    errorToast,
    successToast,
    setBookToEdit,
  });

  const reservedBooks = reservedBooksSelector?.reservations.filter(
    isReservationCurrent
  );

  const getBookListColumns = () =>
    userType === UserType.LIBRARIAN
      ? BookListColumns(onEdit, onDelete, onDetails)
      : ReaderListColumns(onReservation, reservedBooks ?? [], onDetails);

  return (
    <>
      <Table data={books ?? []} columns={getBookListColumns()} />
      <BookModalEdit isOpen={isOpen} onClose={onClose} book={bookToEdit} />
    </>
  );
};
