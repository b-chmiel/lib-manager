import React from "react";
import { selectUserInfo } from "../../auth/state/authSelectors";
import { useAppSelector } from "../../config/hooks";
import { ReservationsList } from "../components/ReservationsList/ReservationsList";
import { useReservationList } from "../hooks/useReservations";

export const ReservationsView: React.FC = () => {
  const { reservations } = useReservationList();
  const user = useAppSelector(selectUserInfo);

  return (
    <>
      {reservations !== null ? (
        <ReservationsList reservations={reservations} user={user} />
      ) : (
        <></>
      )}
    </>
  );
};
