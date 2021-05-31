import { useToast } from "@chakra-ui/react";

export const useStatusToasts = () => {
  const toast = useToast();

  const errorToast = (title: string, error: string) => {
    toast({
      title,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const successToast = (title: string) => {
    toast({
      title,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return { errorToast, successToast };
};
