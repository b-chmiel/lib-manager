import { createAsyncThunk } from "@reduxjs/toolkit";
import { MakeReservationData } from "./reservation.types";
import {
  deleteReservation,
  getReservations,
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
  async (userId: number) => await getReservations(userId)
);
