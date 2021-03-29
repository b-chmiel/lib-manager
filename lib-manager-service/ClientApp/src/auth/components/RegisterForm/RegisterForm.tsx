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
import React from "react";
import { initialFormValues } from "./RegisterForm.constants";
import { validate } from "./RegisterForm.helpers";
import { RegisterFormData } from "./RegisterForm.types";

/**
 * A form to allow registering a new user
 * @constructor
 */
export const RegisterForm: React.FC = () => {
  const handleSubmit = (
    values: RegisterFormData,
    { setSubmitting }: FormikHelpers<RegisterFormData>
  ) => {
    console.log(
      `username: ${values.username}, password: ${values.password}, confirmPassword: ${values.confirmPassword}`
    );
    setSubmitting(false);
  };

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
        <Heading>Register</Heading>
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
                  <FormLabel>Username</FormLabel>
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
                  <FormLabel>Password</FormLabel>
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

                <FormControl
                  mt={4}
                  isInvalid={
                    !!(errors.confirmPassword && touched.confirmPassword)
                  }
                >
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    type={"password"}
                    placeholder={"********"}
                    name={"confirmPassword"}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                </FormControl>
                <Button
                  width={"full"}
                  mt={4}
                  type={"submit"}
                  isDisabled={isSubmitting || !isValid}
                  isLoading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Sign up
                </Button>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};
