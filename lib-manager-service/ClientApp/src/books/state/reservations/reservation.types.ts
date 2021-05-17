export interface MakeReservationData {
  bookId: number;
  userId: number;
}

export interface Reservation {
  reservationId: number;
  bookId: number;
  userId: number;
  reservationStart: string;
  reservationEnd: string;
}
