import { RootState } from "../../../config/store";

export const selectPostReservation = (state: RootState) =>
  state.reservationsReducer.getReservations;

export const selectDeleteReservation = (state: RootState) =>
  state.reservationsReducer.deleteReservation;

export const selectGetReservations = (state: RootState) =>
  state.reservationsReducer.getReservations;

export const selectGetUserReservations = (state: RootState) =>
  state.reservationsReducer.getUserReservations;

export const selectReservationStats = (state: RootState) =>
  state.reservationsReducer.reservationStats;
