export interface MakeReservationData {
  bookId: number;
  userId: string;
}

export interface Reservation {
  reservationID: number;
  bookId: number;
  userId: number;
  reservationStart: string;
  reservationEnd: string;
}
