import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Card } from "../../../common/components/Card";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { selectReservationStats } from "../../state/reservations/reservationsSelectors";
import { getReservationStatsAsync } from "../../state/reservations/reservationsThunks";

export const ReservationStats = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector(selectReservationStats);

  useEffect(() => {
    dispatch(getReservationStatsAsync());
  }, [dispatch]);

  return (
    <Card mb={4}>
      <StatGroup>
        <Stat>
          <StatLabel>Total reservations</StatLabel>
          <StatNumber>{stats?.totalReservations ?? "-"}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Active reservations</StatLabel>
          <StatNumber>{stats?.activeReservations ?? "-"}</StatNumber>
        </Stat>
      </StatGroup>
    </Card>
  );
};
