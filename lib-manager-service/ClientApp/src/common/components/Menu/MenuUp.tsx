import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { selectAuthUserType } from "../../../auth/state/authSelectors";
import { logout } from "../../../auth/state/authSlice";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { Routes } from "../../../routing/routes";
import { getUserType } from "./MenuUp.helpers";
import { MainBox } from "./MenuUp.styles";

export const MenuUp: FC = () => {
  const { t } = useTranslation();
  const type = useAppSelector(selectAuthUserType);
  const userType = getUserType(type);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onLogoutClick = () => {
    dispatch(logout());
    history.push(Routes.LOGIN);
  };

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
          flexDirection={"row"}
        >
          <Text mr={4} fontSize={"xl"}>
            {userType}
          </Text>
          <Button colorScheme={"teal"} onClick={() => onLogoutClick()}>
            {t("Menu.Logout")}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
