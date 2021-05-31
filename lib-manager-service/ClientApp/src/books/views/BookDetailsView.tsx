import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { BookInfo } from "../components/BookInfo/BookInfo";
import { selectGetBook } from "../state/books/bookSelectors";
import { getBooksAsync } from "../state/books/bookThunks";

export const BookDetailsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookId } = useParams();
  const book = useAppSelector((state) => selectGetBook(state, bookId));

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  return <BookInfo book={book} />;
};
