import { createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../../common/utils/types";
import { deleteBookAsync } from "../books/bookThunks";
import { Reservation } from "./reservation.types";
import {
  deleteReservationAsync,
  getReservationsAsync,
  postReservationAsync,
} from "./reservationsThunks";

export interface ReservationState {
  createReservation: {
    status: RequestStatus;
    error: string | undefined;
  };
  deleteReservation: {
    status: RequestStatus;
    error: string | undefined;
  };
  getReservations: {
    status: RequestStatus;
    error: string | undefined;
    reservations: Reservation[];
  };
}

const initialState: ReservationState = {
  createReservation: {
    status: RequestStatus.INIT,
    error: "",
  },
  deleteReservation: {
    status: RequestStatus.INIT,
    error: "",
  },
  getReservations: {
    status: RequestStatus.INIT,
    error: "",
    reservations: [],
  },
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReservationAsync.pending, (state) => {
        state.createReservation.status = RequestStatus.LOADING;
      })
      .addCase(postReservationAsync.fulfilled, (state) => {
        state.createReservation.status = RequestStatus.SUCCESS;
      })
      .addCase(postReservationAsync.rejected, (state, action) => {
        state.createReservation.status = RequestStatus.FAILED;
        state.createReservation.error = action.error.message;
      })
      .addCase(deleteReservationAsync.pending, (state) => {
        state.deleteReservation.status = RequestStatus.LOADING;
      })
      .addCase(deleteReservationAsync.fulfilled, (state) => {
        state.deleteReservation.status = RequestStatus.SUCCESS;
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.deleteReservation.status = RequestStatus.FAILED;
        state.deleteReservation.error = action.error.message;
      })
      .addCase(getReservationsAsync.pending, (state) => {
        state.getReservations.status = RequestStatus.LOADING;
      })
      .addCase(getReservationsAsync.fulfilled, (state, action) => {
        state.getReservations.status = RequestStatus.SUCCESS;
        state.getReservations.reservations = action.payload;
      })
      .addCase(getReservationsAsync.rejected, (state, action) => {
        state.getReservations.status = RequestStatus.FAILED;
        state.getReservations.error = action.error.message;
      });
  },
});

export default reservationsSlice.reducer;
