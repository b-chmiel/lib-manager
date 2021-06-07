import { format } from "date-fns";
import { getData } from "../../../src/reservations/components/ReservationsChart/ReservationsChart.helpers";
import { Reservation } from "../../../src/reservations/state/reservations/reservation.types";

describe("ReservationChart.helpers.spec.ts", () => {
  it("should return undefined if reservation list is empty", () => {
    const reservations: Reservation[] = [];
    expect(getData(reservations)).toBeUndefined();
  });

  it("should return correct list if reservations provided in one day ", () => {
    const reservations: Reservation[] = [
      {
        reservationID: 0,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 1).toISOString(),
        reservationEnd: new Date(2021, 1, 2).toISOString(),
      },
      {
        reservationID: 1,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 1).toISOString(),
        reservationEnd: new Date(0, 1, 2).toISOString(),
      },
    ];

    const result = getData(reservations);
    expect(result).toBeDefined();
    expect(result?.length).toEqual(1);
    expect(result?.[0]).toEqual({
      name: format(new Date(2021, 1, 1), "dd/MM/yyyy"),
      reservationsInDay: 2,
    });
  });
  it("should return correct list if reservations provided in multiple days", () => {
    const reservations: Reservation[] = [
      {
        reservationID: 0,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 1).toISOString(),
        reservationEnd: new Date(2021, 1, 2).toISOString(),
      },
      {
        reservationID: 1,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 1).toISOString(),
        reservationEnd: new Date(0, 1, 2).toISOString(),
      },
      {
        reservationID: 2,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 2).toISOString(),
        reservationEnd: new Date(2021, 1, 2).toISOString(),
      },
      {
        reservationID: 3,
        bookId: 0,
        userId: 0,
        reservationStart: new Date(2021, 1, 3).toISOString(),
        reservationEnd: new Date(2021, 1, 2).toISOString(),
      },
    ];

    const result = getData(reservations);
    expect(result).toBeDefined();
    expect(result?.length).toEqual(3);
    expect(result?.[0]).toEqual({
      name: format(new Date(2021, 1, 1), "dd/MM/yyyy"),
      reservationsInDay: 2,
    });
    expect(result?.[1]).toEqual({
      name: format(new Date(2021, 1, 2), "dd/MM/yyyy"),
      reservationsInDay: 1,
    });
    expect(result?.[2]).toEqual({
      name: format(new Date(2021, 1, 3), "dd/MM/yyyy"),
      reservationsInDay: 1,
    });
  });
});
