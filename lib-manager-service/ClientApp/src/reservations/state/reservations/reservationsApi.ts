import axios from "axios";
import { ApiRoutes } from "../../../routing/routes";
import {
  MakeReservationData,
  Reservation,
  ReservationStats,
} from "./reservation.types";

export function postReservation(
  reservation: MakeReservationData
): Promise<string> {
  return axios
    .post(
      `${ApiRoutes.CREATE_RESERVATION}?bookId=${reservation.bookId}&username=${reservation.userId}`
    )
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function deleteReservation(reservationId: number): Promise<string> {
  return axios
    .post(`${ApiRoutes.DELETE_RESERVATION}?reservationId=${reservationId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function getUserReservations(userId: string): Promise<Reservation[]> {
  return axios
    .get(`${ApiRoutes.GET_RESERVATIONS}?username=${userId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function getReservations(): Promise<Reservation[]> {
  return axios
    .get(`${ApiRoutes.GET_ALL_RESERVATIONS}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function getReservationStats(): Promise<ReservationStats> {
  return axios
    .get(ApiRoutes.GET_RESERVATION_STATS)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}
