import { Box } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { Author } from "../../state/book.types";

export const BookListColumns = [
  {
    Header: "ID",
    accessor: "id",
    Cell: (props: { value: number }) => <Box>{props.value}</Box>,
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: (props: { value: string }) => <Box>{props.value}</Box>,
  },
  {
    Header: "Subtitle",
    accessor: "subtitle",
    Cell: (props: { value: string }) => <Box>{props.value}</Box>,
  },
  {
    Header: "Author",
    accessor: "author",
    Cell: (props: { value: Author }) => (
      <Box>
        {props.value.name} {props.value.surname}
      </Box>
    ),
  },
  {
    Header: "Count",
    accessor: "count",
    Cell: (props: { value: number }) => <Box>{props.value}</Box>,
  },
] as Column[];
