import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Column } from "react-table";
import { isReservationCurrent } from "../../helpers/isReservationCurrent";

export const ReservationListColumns = (
  onCancelReservation: (bookId: number) => void
) =>
  [
    {
      Header: "ReservationID",
      accessor: "reservationID",
      Cell: (props: { value: string }) => <Box>{props.value}</Box>,
    },
    {
      Header: "BookId",
      accessor: "bookId",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "Start",
      accessor: "reservationStart",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "End",
      accessor: "reservationEnd",
      Cell: (props: { value: number }) => <Box>{props.value}</Box>,
    },
    {
      Header: "",
      accessor: "Reservation",
      Cell: (props: any) => {
        const reservation = props.cell.row.original;

        return (
          <>
            {isReservationCurrent(reservation) ? (
              <Button
                colorScheme={"red"}
                onClick={() => onCancelReservation(reservation.reservationID)}
              >
                Cancel
              </Button>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ] as Column[];
