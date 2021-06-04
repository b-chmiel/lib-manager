import React, { useEffect } from "react";
import { UserType } from "../../auth/state/auth.types";
import { selectUserInfo } from "../../auth/state/authSelectors";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { ReservationsList } from "../components/ReservationsList/ReservationsList";
import {
  selectGetReservations,
  selectGetUserReservations,
} from "../state/reservations/reservationsSelectors";
import {
  getReservationsAsync,
  getUserReservationsAsync,
} from "../state/reservations/reservationsThunks";

export const ReservationsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const allReservations = useAppSelector(selectGetReservations);
  const userReservations = useAppSelector(selectGetUserReservations);

  useEffect(() => {
    dispatch(getReservationsAsync());
    dispatch(getUserReservationsAsync(user?.name ?? ""));
  }, [dispatch]);

  const reservations =
    user?.type === UserType.LIBRARIAN ? allReservations : userReservations;

  // reservations.reservations.sort((a, b) => b.reservationID - a.reservationID);

  return (
    <>
      {reservations.reservations !== null ? (
        <ReservationsList
          reservations={reservations.reservations}
          user={user}
        />
      ) : (
        <></>
      )}
    </>
  );
};
