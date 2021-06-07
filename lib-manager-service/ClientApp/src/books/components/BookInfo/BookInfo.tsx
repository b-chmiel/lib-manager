import {
  Box,
  Divider,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { getYear } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../../../common/components/Card";
import { Book } from "../../state/books/book.types";

interface Props {
  book?: Book;
}

export const BookInfo: React.FC<Props> = ({ book }) => {
  const { t } = useTranslation();

  const publicationDate =
    book !== undefined && book.publicationDate !== undefined
      ? getYear(new Date(book.publicationDate))
      : "--";

  return (
    <Box m={8}>
      <Card>
        <StatGroup>
          <Stat>
            <StatLabel>{t("AddBookForm.BookTitle")}</StatLabel>
            <StatNumber>{book?.bookTitle ?? "--"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{t("AddBookForm.AuthorName")}</StatLabel>
            <StatNumber>{book?.authorName ?? "--"}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{t("AddBookForm.PublicationDate")}</StatLabel>
            <StatNumber>{publicationDate}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{t("AddBookForm.BookLanguage")}</StatLabel>
            <StatNumber>{book?.language ?? "--"}</StatNumber>
          </Stat>
        </StatGroup>
      </Card>
      <Card>
        <Text fontSize="xl">{t("AddBookForm.BookDescription")}</Text>
        <Divider mt={4} mb={4} />
        <Text fontSize="md">{book?.description ?? "--"}</Text>
      </Card>
    </Box>
  );
};
