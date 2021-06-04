import React from "react";
import { User } from "../../../auth/state/auth.types";
import { Table } from "../../../common/components/Table";
import { Reservation } from "../../state/reservations/reservation.types";
import { ReservationListColumns } from "./ReservationList.constants";
import { useReservation } from "./ReservationList.hooks";

interface Props {
  reservations: Reservation[];
  user?: User;
}

export const ReservationsList: React.FC<Props> = ({ reservations, user }) => {
  const { onCancelReservation } = useReservation({ user });

  return (
    <Table
      data={reservations ?? []}
      columns={ReservationListColumns(onCancelReservation)}
    />
  );
};
