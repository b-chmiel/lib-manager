import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequestStatus } from "../../../common/utils/types";
import { useAppDispatch, useAppSelector } from "../../../config/hooks";
import { BookLanguage } from "../../state/book.types";
import {
  getBooksAsync,
  postBookAsync,
  selectPostBookError,
  selectPostBookStatus,
} from "../../state/librarianSlice";
import { initialValues } from "./AddBookForm.constants";
import { validate } from "./AddBookForm.helpers";
import { AddBookFormData } from "./AddBookForm.types";

interface Props {
  onClose: () => void;
}

export const AddBookForm: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectPostBookStatus);
  const error = useAppSelector(selectPostBookError);
  const { t } = useTranslation();
  const toast = useToast();
  const [isSubmitted, setSubmitted] = useState(false);

  const handleSubmit = (
    values: AddBookFormData,
    { setSubmitting }: FormikHelpers<AddBookFormData>
  ) => {
    setSubmitted(false);
    setSubmitting(true);
    dispatch(postBookAsync(values)).then(() => {
      // handlePosted();
      setSubmitted(true);
      setSubmitting(false);
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      handlePosted();
    }
    //eslint-disable-next-line
  }, [status, isSubmitted]);

  const handlePosted = () => {
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
      title: "Post failed.",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const successToast = () => {
    toast({
      title: "Post success.",
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
              <FormControl isInvalid={!!(errors.title && touched.title)}>
                <FormLabel>{t("AddBookForm.BookTitle")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"title"}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!(errors.subtitle && touched.subtitle)}>
                <FormLabel>{t("AddBookForm.BookSubtitle")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"subtitle"}
                  value={values.subtitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.subtitle}</FormErrorMessage>
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
                isInvalid={!!(errors.authorSurname && touched.authorSurname)}
              >
                <FormLabel>{t("AddBookForm.AuthorSurname")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"authorSurname"}
                  value={values.authorSurname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.authorSurname}</FormErrorMessage>
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
              <FormControl
                isInvalid={!!(errors.bookSeriesName && touched.bookSeriesName)}
              >
                <FormLabel>{t("AddBookForm.BookSeriesName")}</FormLabel>
                <Input
                  type={"text"}
                  placeholder={""}
                  name={"bookSeriesName"}
                  value={values.bookSeriesName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.bookSeriesName}</FormErrorMessage>
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
                    {t("AddBookForm.BookLanguage.English")}
                  </option>
                  <option value={BookLanguage.FRENCH}>
                    {t("AddBookForm.BookLanguage.French")}
                  </option>
                  <option value={BookLanguage.POLISH}>
                    {t("AddBookForm.BookLanguage.Polish")}
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
