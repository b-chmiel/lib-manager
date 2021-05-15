import { FormikErrors } from "formik";
import i18next from "i18next";
import { AddBookFormData } from "./AddBookForm.types";

export const validate = (values: AddBookFormData) => {
  const errors: FormikErrors<AddBookFormData> = {};

  if (!values.authorName || values.authorName.trim() === "") {
    errors.authorName = i18next.t("AddBookForm.AuthorNameRequired");
  }
  if (!values.bookTitle || values.bookTitle.trim() === "") {
    errors.bookTitle = i18next.t("AddBookForm.TitleRequired");
  }
  if (!values.pageCount) {
    errors.pageCount = i18next.t("AddBookForm.PageCountRequired");
  }
  if (!values.count) {
    errors.count = i18next.t("AddBookForm.CountRequired");
  }

  return errors;
};
