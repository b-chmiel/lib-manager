import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { BookControls } from "../components/BookControls";
import { BookList } from "../components/BookList";
import { getBooksAsync, selectGetBooks } from "../state/librarianSlice";

export const BookInventoryView = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectGetBooks);

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  return (
    <Flex m={16} flexDir={"column"}>
      <BookControls />
      <BookList books={books} />
    </Flex>
  );
};
