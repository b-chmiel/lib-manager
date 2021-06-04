import { Reservation } from "../state/reservations/reservation.types";

export const isReservationCurrent = (reservation: Reservation) => {
  return (
    new Date(reservation.reservationEnd) <
    new Date(reservation.reservationStart)
  );
};
