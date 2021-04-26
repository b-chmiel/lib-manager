import { FormikErrors } from "formik";
import i18next from "i18next";
import { LoginFormData } from "./LoginForm.types";

export const validate = (values: LoginFormData) => {
  const errors: FormikErrors<LoginFormData> = {};

  if (!values.username) {
    errors.username = i18next.t("Auth.UsernameRequired");
  }

  if (!values.password) {
    errors.password = i18next.t("Auth.PasswordRequired");
  }

  return errors;
};
