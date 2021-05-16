import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Table } from "../../../common/components/Table";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { Book } from "../../state/book.types";
import {
  deleteBookAsync,
  getBooksAsync,
  selectDeleteBookError,
  selectDeleteBookStatus,
} from "../../state/librarianSlice";
import { BookFormData } from "../BookForm/BookForm.types";
import { BookModalEdit } from "../BookModalEdit";
import { BookListColumns } from "./BookList.constants";
import { getBookById } from "./BookList.helpers.ts";

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDeleteBookStatus);
  const error = useAppSelector(selectDeleteBookError);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookToEdit, setBookToEdit] = useState<BookFormData | undefined>(
    undefined
  );

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

  return (
    <>
      <Table data={books ?? []} columns={BookListColumns(onEdit, onDelete)} />
      <BookModalEdit isOpen={isOpen} onClose={onClose} book={bookToEdit} />
    </>
  );
};
