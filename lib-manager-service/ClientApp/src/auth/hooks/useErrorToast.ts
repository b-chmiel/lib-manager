import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export const useErrorToast = (title: string, error: string | undefined) => {
  const toast = useToast();
  useEffect(() => {
    if (error !== "") {
      toast({
        title: "Login error.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);
};
