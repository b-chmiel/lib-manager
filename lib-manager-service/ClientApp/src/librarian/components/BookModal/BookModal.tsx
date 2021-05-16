import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  postBookAsync,
  selectPostBookError,
  selectPostBookStatus,
} from "../../state/librarianSlice";
import { BookForm } from "../BookForm";
import { initialValues } from "./BookModal.constants";
import "./BookModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("AddBook")}</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <BookForm
            onClose={onClose}
            actionToDispatch={postBookAsync}
            initialValues={initialValues}
            statusSelector={selectPostBookStatus}
            errorSelector={selectPostBookError}
          />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
