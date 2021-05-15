import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
import { BookListColumns } from "./BookList.constants";

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDeleteBookStatus);
  const error = useAppSelector(selectDeleteBookError);
  const toast = useToast();

  const onDelete = (bookId: number) => dispatch(deleteBookAsync(bookId));

  const onEdit = (bookId: number) => console.log(bookId);

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
    </>
  );
};
