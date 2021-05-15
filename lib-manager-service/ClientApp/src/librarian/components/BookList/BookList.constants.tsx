import { Box } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";

export const BookListColumns = [
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
    accessor: "count",
    Cell: (props: { value: number }) => <Box>{props.value}</Box>,
  },
] as Column[];
