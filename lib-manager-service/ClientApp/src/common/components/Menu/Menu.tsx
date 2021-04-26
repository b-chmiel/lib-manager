import React, { FC } from "react";
import { MenuUp } from "./MenuUp";

export const Menu: FC = ({ children }) => {
  return (
    <>
      <MenuUp />
      {children}
    </>
  );
};
