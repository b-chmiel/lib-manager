import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserType } from "../../auth/state/auth.types";
import { selectAuthUserType } from "../../auth/state/authSelectors";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { BookControls } from "../components/BookControls";
import { BookList } from "../components/BookList";
import { ReservationStats } from "../components/ReservationStats/ReservationStats";
import { selectGetBooks } from "../state/books/bookSelectors";
import { getBooksAsync } from "../state/books/bookThunks";

export const BookInventoryView = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectGetBooks);
  const userType = useAppSelector(selectAuthUserType);

  useEffect(() => {
    dispatch(getBooksAsync());
  }, [dispatch]);

  return (
    <Flex m={16} flexDir={"column"}>
      {userType === UserType.LIBRARIAN ? <BookControls /> : <></>}
      {userType === UserType.LIBRARIAN ? <ReservationStats /> : <></>}
      <BookList books={books} />
    </Flex>
  );
};
