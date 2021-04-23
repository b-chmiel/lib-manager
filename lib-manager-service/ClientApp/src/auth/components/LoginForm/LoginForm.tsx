import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { Routes } from "../../../routing/routes";
import { useErrorToast } from "../../hooks/useErrorToast";
import { useRedirectOnSuccess } from "../../hooks/useRedirectOnSuccess";
import {
  loginAsync,
  revalidateAuth,
  selectAuthError,
  selectAuthStatus,
} from "../../state/authSlice";
import { initialFormValues } from "./LoginForm.constants";
import { validate } from "./LoginForm.helpers";
import { LoginFormData } from "./LoginForm.types";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const authStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);

  const handleSubmit = (
    values: LoginFormData,
    { setSubmitting }: FormikHelpers<LoginFormData>
  ) => {
    setSubmitting(true);
    dispatch(loginAsync(values)).then(() => setSubmitting(false));
  };

  useEffect(() => {
    dispatch(revalidateAuth());
  }, [dispatch]);

  useErrorToast("Authorization error.", authError);
  useRedirectOnSuccess(authStatus, Routes.HOME_PAGE);

  return (
    <Box
      width={"full"}
      maxWidth={500}
      p={8}
      borderWidth={1}
      borderRadius={8}
      boxShadow={"lg"}
    >
      <Box textAlign={"center"}>
        <Heading>{t("Auth.WelcomeBack")}</Heading>
      </Box>

      <Box my={4} mb={0} textAlign={"left"}>
        <Formik
          initialValues={initialFormValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <FormControl
                  isInvalid={!!(errors.username && touched.username)}
                >
                  <FormLabel>{t("Auth.Username")}</FormLabel>
                  <Input
                    type={"text"}
                    placeholder={"username"}
                    name={"username"}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={4}
                  isInvalid={!!(errors.password && touched.password)}
                >
                  <FormLabel>{t("Auth.Password")}</FormLabel>
                  <Input
                    type={"password"}
                    placeholder={"********"}
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  width={"full"}
                  mt={4}
                  isDisabled={isSubmitting || !isValid}
                  isLoading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  {t("Auth.SignIn")}
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
