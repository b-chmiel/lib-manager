import { FormikErrors } from "formik";
import i18next from "i18next";
import { RegisterFormData } from "./RegisterForm.types";

export const validate = (values: RegisterFormData) => {
  const errors: FormikErrors<RegisterFormData> = {};

  if (!values.username) {
    errors.username = i18next.t("Auth.UsernameRequired");
  }

  if (!values.password) {
    errors.password = i18next.t("Auth.PasswordRequired");
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = i18next.t("Auth.ConfirmPasswordIsRequired");
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = i18next.t("Auth.ConfirmPasswordDoesNotMatch");
  }

  if (values.password.length < 8) {
    errors.password = i18next.t("Auth.PasswordLen");
  }

  return errors;
};
