import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { selectAuthUserType } from "../../../auth/state/authSlice";
import { useAppSelector } from "../../../config/hooks";
import { getUserType } from "./MenuUp.helpers";
import { MainBox } from "./MenuUp.styles";

export const MenuUp: FC = () => {
  const { t } = useTranslation();
  const type = useAppSelector(selectAuthUserType);
  const userType = getUserType(type);

  return (
    <Box className={MainBox}>
      <Flex
        flexDirection={"row"}
        justify={"space-between"}
        minHeight={"inherit"}
      >
        <Flex
          ml={4}
          minHeight={"inherit"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Text fontSize={"2xl"}>{t("Menu.Title")}</Text>
        </Flex>
        <Flex
          mr={4}
          minHeight={"inherit"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <Text fontSize={"xl"}>{userType}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
