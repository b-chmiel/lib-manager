import {
  addDays,
  compareAsc,
  differenceInCalendarDays,
  format,
} from "date-fns";
import { Reservation } from "../../state/reservations/reservation.types";

export const getData = (reservations: Reservation[]) => {
  if (reservations.length === 0) return;

  const datesOfReservations = reservations
    .map((reservation) => new Date(reservation.reservationStart))
    .slice()
    .sort(compareAsc);

  const startDate = datesOfReservations[0];
  const endDate = datesOfReservations[datesOfReservations.length - 1];

  const days = differenceInCalendarDays(endDate, startDate) + 1;

  const daysList = [...Array(days)]
    .map((_, i) => i)
    .map((day: number) => addDays(new Date(startDate), day));

  return daysList.map((day) => ({
    name: format(day, "dd/MM/yyyy"),
    reservationsInDay: reservationsInDay(day, datesOfReservations),
  }));
};

const reservationsInDay = (day: Date, reservations: Date[]) =>
  reservations.filter(
    (reservation) =>
      reservation.getUTCFullYear() === day.getFullYear() &&
      reservation.getMonth() === day.getMonth() &&
      reservation.getDate() === day.getDate()
  ).length;
