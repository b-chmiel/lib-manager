import React from "react";
import { ReservationsChart } from "../components/ReservationsChart/ReservationsChart";
import { useReservationList } from "../hooks/useReservations";

export const ReservationChartsView = () => {
  const { reservations } = useReservationList();

  return <ReservationsChart reservations={reservations} />;
};
