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
  editBookAsync,
  selectEditBookError,
  selectEditBookStatus,
} from "../../state/librarianSlice";
import { BookForm } from "../BookForm";
import { BookFormData } from "../BookForm/BookForm.types";
import "./BookModalEdit.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: BookFormData | undefined;
}

export const BookModalEdit: React.FC<Props> = ({ isOpen, onClose, book }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("EditBook")}</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          {book ? (
            <BookForm
              onClose={onClose}
              actionToDispatch={editBookAsync}
              initialValues={book}
              statusSelector={selectEditBookStatus}
              errorSelector={selectEditBookError}
            />
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
