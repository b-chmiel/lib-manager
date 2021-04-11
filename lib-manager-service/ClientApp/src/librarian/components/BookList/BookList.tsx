import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Table } from "../../../common/components/Table";
import { Book } from "../../state/book.types";
import { BookListColumns } from "./BookList.constants";

interface Props {
  books: Book[];
}

export const BookList: React.FC<Props> = ({ books }) => {
  return (
    <Flex m={16}>
      <Table data={books ?? []} columns={BookListColumns} />
    </Flex>
  );
};
