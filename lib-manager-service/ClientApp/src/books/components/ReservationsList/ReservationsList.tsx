import React from "react";
import { User } from "../../../auth/state/auth.types";
import { Table } from "../../../common/components/Table";
import { useAppDispatch } from "../../../config/hooks";
import { Reservation } from "../../state/reservations/reservation.types";
import {
  deleteReservationAsync,
  getUserReservationsAsync,
} from "../../state/reservations/reservationsThunks";
import { ReservationListColumns } from "./ReservationList.constants";

interface Props {
  reservations: Reservation[];
  user?: User;
}

export const ReservationsList: React.FC<Props> = ({ reservations, user }) => {
  const dispatch = useAppDispatch();

  const onCancelReservation = (reservationId: number) => {
    const userId = user?.name ?? "";
    dispatch(getUserReservationsAsync(userId)).then(() => {
      dispatch(deleteReservationAsync(reservationId)).then(() => {
        dispatch(getUserReservationsAsync(userId));
      });
    });
  };

  return (
    <Table
      data={reservations ?? []}
      columns={ReservationListColumns(onCancelReservation)}
    />
  );
};
