import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AppLink } from "../../../routing/components/AppLink";
import { Routes } from "../../../routing/routes";
import { LoginForm } from "../../components/LoginForm/LoginForm";

const LoginView: React.FC = () => {
  return (
    <Flex
      width={"full"}
      p={4}
      align={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <LoginForm />
      <Box
        width={"full"}
        maxWidth={500}
        my={6}
        p={2}
        borderWidth={1}
        borderRadius={8}
        boxShadow={"lg"}
      >
        <Text display={"inline"}>Are you new here? </Text>
        <AppLink to={Routes.REGISTER}>Register</AppLink>
      </Box>
    </Flex>
  );
};

export default LoginView;
