import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { BookInfo } from "../components/BookInfo/BookInfo";
import { selectGetBook } from "../state/books/bookSelectors";
import { getBookAsync } from "../state/books/bookThunks";

export const BookDetailsView: React.FC = () => {
  const dispatch = useAppDispatch();
  //@ts-ignore
  const { bookId } = useParams();
  const book = useAppSelector(selectGetBook);

  useEffect(() => {
    dispatch(getBookAsync(bookId));
  }, []);

  return <BookInfo book={book} />;
};
