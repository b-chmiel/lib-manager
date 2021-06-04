import { createAsyncThunk } from "@reduxjs/toolkit";
import { MakeReservationData } from "./reservation.types";
import {
  deleteReservation,
  getReservations,
  getReservationStats,
  getUserReservations,
  postReservation,
} from "./reservationsApi";

export const postReservationAsync = createAsyncThunk(
  "reservations/post-reservation",
  async (reservation: MakeReservationData) => await postReservation(reservation)
);

export const deleteReservationAsync = createAsyncThunk(
  "reservations/delete-reservation",
  async (reservationId: number) => await deleteReservation(reservationId)
);

export const getReservationsAsync = createAsyncThunk(
  "reservations/get-reservations",
  async () => await getReservations()
);

export const getUserReservationsAsync = createAsyncThunk(
  "reservations/get-user-reservations",
  async (userId: string) => await getUserReservations(userId)
);

export const getReservationStatsAsync = createAsyncThunk(
  "reservations/get-reservation-stats",
  async () => await getReservationStats()
);
