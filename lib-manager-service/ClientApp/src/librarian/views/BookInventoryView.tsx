import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { BookList } from "../components/BookList";
import { getBooksAsync, selectGetBooks } from "../state/librarianSlice";

export const BookInventoryView = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectGetBooks);

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  return (
    <>
      <BookList books={books} />
    </>
  );
};
