import React, { useEffect } from "react";
import { UserType } from "../../auth/state/auth.types";
import { selectUserInfo } from "../../auth/state/authSelectors";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import {
  selectGetReservations,
  selectGetUserReservations,
} from "../../reservations/state/reservations/reservationsSelectors";
import {
  getReservationsAsync,
  getUserReservationsAsync,
} from "../../reservations/state/reservations/reservationsThunks";
import { ReservationsList } from "../components/ReservationsList/ReservationsList";

export const ReservationsView: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const allReservations = useAppSelector(selectGetReservations);
  const userReservations = useAppSelector(selectGetUserReservations);

  useEffect(() => {
    dispatch(getReservationsAsync());
    dispatch(getUserReservationsAsync(user?.name ?? ""));
  }, [dispatch, user?.name]);

  const reservations =
    user?.type === UserType.LIBRARIAN ? allReservations : userReservations;

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
