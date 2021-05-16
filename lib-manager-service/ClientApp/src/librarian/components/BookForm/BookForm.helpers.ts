import { FormikErrors } from "formik";
import i18next from "i18next";
import { BookFormData } from "./BookForm.types";

export const validate = (values: BookFormData) => {
  const errors: FormikErrors<BookFormData> = {};

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
