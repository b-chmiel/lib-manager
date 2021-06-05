import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Reservation } from "../../state/reservations/reservation.types";
import { getData } from "./ReservationsChart.helpers";

interface Props {
  reservations: Reservation[];
}

export const ReservationsChart: React.FC<Props> = ({ reservations }) => {
  const data = getData(reservations);

  return (
    <>
      <Center m={4}>
        <Text fontSize={"xl"}>Book reservations in a day</Text>
      </Center>
      <Box>
        <BarChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="reservationsInDay" fill="#8884d8" />
        </BarChart>
      </Box>
    </>
  );
};
