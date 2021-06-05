import { User } from "../../../auth/state/auth.types";
import { useAppDispatch } from "../../../config/hooks";
import {
  deleteReservationAsync,
  getUserReservationsAsync,
} from "../../state/reservations/reservationsThunks";

interface Props {
  user?: User;
}

export const useReservation = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const onCancelReservation = (reservationId: number) => {
    const userId = user?.name ?? "";
    dispatch(getUserReservationsAsync(userId)).then(() => {
      dispatch(deleteReservationAsync(reservationId)).then(() => {
        dispatch(getUserReservationsAsync(userId));
      });
    });
  };

  return { onCancelReservation };
};
