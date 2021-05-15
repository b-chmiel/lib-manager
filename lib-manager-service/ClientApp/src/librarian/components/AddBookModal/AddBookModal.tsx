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
import { AddBookForm } from "../AddBookForm";
import "./AddBookModal.fix.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("AddBook")}</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <AddBookForm onClose={onClose} />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
