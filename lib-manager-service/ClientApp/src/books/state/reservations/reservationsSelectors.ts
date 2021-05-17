import { RootState } from "../../../config/store";

export const selectPostReservation = (state: RootState) =>
  state.reservationsReducer.getReservations;

export const selectDeleteReservation = (state: RootState) =>
  state.reservationsReducer.deleteReservation;

export const selectGetReservations = (state: RootState) =>
  state.reservationsReducer.getReservations;
