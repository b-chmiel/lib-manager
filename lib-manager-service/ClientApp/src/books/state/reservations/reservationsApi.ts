import axios from "axios";
import { ApiRoutes } from "../../../routing/routes";
import { MakeReservationData, Reservation } from "./reservation.types";

export function postReservation(
  reservation: MakeReservationData
): Promise<string> {
  return axios
    .post(
      `${ApiRoutes.CREATE_RESERVATION}?bookId=${reservation.bookId}&userId=${reservation.userId}`
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function deleteReservation(reservationId: number): Promise<string> {
  return axios
    .delete(`${ApiRoutes.DELETE_RESERVATION}?reservationId=${reservationId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function getReservations(userId: number): Promise<Reservation[]> {
  return axios
    .post(`${ApiRoutes.GET_RESERVATIONS}?userId=${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}
