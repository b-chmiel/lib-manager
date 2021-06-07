import { isReservationCurrent } from "../../../src/reservations/helpers/isReservationCurrent";

describe("isReservationCurrent.ts", () => {
  it("should return false if not current", () => {
    const reservation = {
      reservationID: 0,
      bookId: 0,
      userId: 0,
      reservationStart: new Date(2021, 1, 1).toString(),
      reservationEnd: new Date(2021, 2, 1).toString(),
    };
    expect(isReservationCurrent(reservation)).toBeFalsy();
  });
  it("should return true if current", () => {
    const reservation = {
      reservationID: 0,
      bookId: 0,
      userId: 0,
      reservationStart: new Date(2021, 1, 1).toString(),
      reservationEnd: new Date(0, 2, 1).toString(),
    };
    expect(isReservationCurrent(reservation)).toBeTruthy();
  });
});

export {};
