import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { Reservation } from "../../state/reservations/reservation.types";

export const BookListColumns = (
  onEdit: (bookId: number) => void,
  onDelete: (bookId: number) => void
) =>
  [
    {
      Header: "ID",
      accessor: "bookId",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Title",
      accessor: "bookTitle",
      Cell: (props: { value: string }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Author",
      accessor: "authorName",
      Cell: (props: { value: string }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Count",
      accessor: "bookCount",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "",
      accessor: "Edit",
      Cell: (props: any) => (
        <Button
          colorScheme={"teal"}
          onClick={() => onEdit(props.cell.row.original.bookId)}
        >
          Edit
        </Button>
      ),
    },
    {
      Header: "",
      accessor: "Delete",
      Cell: (props: any) => (
        <Button
          colorScheme={"red"}
          onClick={() => onDelete(props.cell.row.original.bookId)}
        >
          Delete
        </Button>
      ),
    },
  ] as Column[];

export const ReaderListColumns = (
  onReservation: (bookId: number) => void,
  onCancelReservation: (bookId: number) => void,
  reservedBooks: Reservation[]
) =>
  [
    {
      Header: "ID",
      accessor: "bookId",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Title",
      accessor: "bookTitle",
      Cell: (props: { value: string }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Author",
      accessor: "authorName",
      Cell: (props: { value: string }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Count",
      accessor: "bookCount",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "",
      accessor: "Reservation",
      Cell: (props: any) => {
        const bookId = props.cell.row.original.bookId;

        return reservedBooks.find((book) => book.bookId === bookId) !==
          undefined ? (
          <Button
            colorScheme={"red"}
            onClick={() => onCancelReservation(bookId)}
          >
            Cancel
          </Button>
        ) : (
          <Button colorScheme={"teal"} onClick={() => onReservation(bookId)}>
            Reserve
          </Button>
        );
      },
    },
  ] as Column[];