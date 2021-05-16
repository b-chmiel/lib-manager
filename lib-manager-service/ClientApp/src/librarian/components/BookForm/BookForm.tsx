import { Box } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { RootState } from "../../../config/store";
import { BookLanguage } from "../../state/book.types";
import { getBooksAsync } from "../../state/librarianSlice";
import { validate } from "./BookForm.helpers";
import { BookFormData } from "./BookForm.types";

interface Props {
  onClose: () => void;
  actionToDispatch: (
    d: BookFormData
  ) => AsyncThunkAction<string, BookFormData, {}>;
  initialValues: BookFormData;
  statusSelector: (state: RootState) => RequestStatus;
  errorSelector: (state: RootState) => string | undefined;
}

export const BookForm: React.FC<Props> = ({
  onClose,
  actionToDispatch,
  initialValues,
  statusSelector,
  errorSelector,
}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
  const error = useAppSelector(errorSelector);
  const { t } = useTranslation();
  const toast = useToast();
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = (
    values: BookFormData,
    { setSubmitting }: FormikHelpers<BookFormData>
  ) => {
    setSubmitted(false);
    setSubmitting(true);
    dispatch(actionToDispatch(values)).then(() => {
      handleSubmittion();
      setSubmitted(true);
      setSubmitting(false);
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      handleSubmittion();
    }
    //eslint-disable-next-line
  }, [status, isSubmitted]);

  const handleSubmittion = () => {
    if (status === RequestStatus.FAILED) {
      errorToast();
    } else if (status === RequestStatus.SUCCESS) {
      successToast();
      dispatch(getBooksAsync());
      onClose();
    }
  };

  const errorToast = () => {
    toast({
      title: "Action failed.",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const successToast = () => {
    toast({
      title: "Action success.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
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
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl
                isInvalid={!!(errors.bookTitle && touched.bookTitle)}
              >
                <FormLabel>{t("AddBookForm.BookTitle")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"bookTitle"}
                  value={values.bookTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.bookTitle}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!(errors.authorName && touched.authorName)}
              >
                <FormLabel>{t("AddBookForm.AuthorName")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"authorName"}
                  value={values.authorName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.authorName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!(errors.description && touched.description)}
              >
                <FormLabel>{t("AddBookForm.BookDescription")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"description"}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!(errors.language && touched.language)}>
                <FormLabel>{t("AddBookForm.BookLanguage")}</FormLabel>
                <Select
                  value={values.language}
                  name={"language"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={BookLanguage.ENGLISH}>
                    {t("AddBookForm.Languages.English")}
                  </option>
                  <option value={BookLanguage.FRENCH}>
                    {t("AddBookForm.Languages.French")}
                  </option>
                  <option value={BookLanguage.POLISH}>
                    {t("AddBookForm.Languages.Polish")}
                  </option>
                  <option value={BookLanguage.GERMAN}>
                    {t("AddBookForm.Languages.German")}
                  </option>
                </Select>
                <FormErrorMessage>{errors.language}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!(errors.publicationDate && touched.publicationDate)
                }
              >
                <FormLabel>{t("AddBookForm.PublicationDate")}</FormLabel>
                <NumberInput
                  onChange={(val) =>
                    setFieldValue("publicationDate", Number(val))
                  }
                  value={values.publicationDate}
                  max={3000}
                  min={-100000}
                  step={1}
                >
                  <NumberInputField name={"publicationDate"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.publicationDate}</FormErrorMessage>
              </FormControl>{" "}
              <FormControl
                isInvalid={!!(errors.pageCount && touched.pageCount)}
              >
                <FormLabel>{t("AddBookForm.PageCount")}</FormLabel>
                <NumberInput
                  onChange={(val) => setFieldValue("pageCount", Number(val))}
                  value={values.pageCount}
                  min={0}
                  step={20}
                >
                  <NumberInputField name={"pageCount"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.pageCount}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!(errors.count && touched.count)}>
                <FormLabel>{t("AddBookForm.BookCount")}</FormLabel>
                <NumberInput
                  onChange={(val) => setFieldValue("count", Number(val))}
                  value={values.count}
                  min={0}
                  step={10}
                >
                  <NumberInputField name={"count"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.count}</FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                width={"100%"}
                onClick={() => handleSubmit()}
                isDisabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
              >
                {t("Submit")}
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
