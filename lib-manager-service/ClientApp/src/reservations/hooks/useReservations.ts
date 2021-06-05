import { useEffect } from "react";
import { UserType } from "../../auth/state/auth.types";
import { selectUserInfo } from "../../auth/state/authSelectors";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import {
  selectGetReservations,
  selectGetUserReservations,
} from "../state/reservations/reservationsSelectors";
import {
  getReservationsAsync,
  getUserReservationsAsync,
} from "../state/reservations/reservationsThunks";

export const useReservationList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserInfo);
  const allReservations = useAppSelector(selectGetReservations);
  const userReservations = useAppSelector(selectGetUserReservations);

  useEffect(() => {
    dispatch(getReservationsAsync());
    dispatch(getUserReservationsAsync(user?.name ?? ""));
  }, [dispatch, user?.name]);

  const reservationsInfo =
    user?.type === UserType.LIBRARIAN ? allReservations : userReservations;

  return { reservations: reservationsInfo.reservations };
};
