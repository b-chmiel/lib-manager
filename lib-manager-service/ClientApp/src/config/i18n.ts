import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      AddBook: "Add a book",
      Close: "Close",
      Submit: "Submit",
      Auth: {
        UsernameRequired: "Username is required!",
        PasswordRequired: "Password is required!",
        WelcomeBack: "Welcome back",
        Username: "Username",
        Password: "Password",
        SignIn: "Sign in",
        ConfirmPasswordIsRequired: "Confirm password is required!",
        ConfirmPasswordDoesNotMatch:
          "Confirm password does not match with password!",
        PasswordLen: "Password should have at least 8 characters!",
      },
      AddBookForm: {
        AuthorNameRequired: "Author name is required!",
        AuthorSurnameRequired: "Author surname is required!",
        TitleRequired: "Title is required!",
        PageCountRequired: "Page count is required!",
        CountRequired: "Book count is required!",
        BookTitle: "Title",
        BookSubtitle: "Subtitle",
        AuthorName: "Author name",
        AuthorSurname: "Author surname",
        BookDescription: "Description",
        BookSeriesName: "Series name",
        BookLanguage: "Language",
        PublicationDate: "Publication date",
        PageCount: "Page count",
        BookCount: "Book count",
        Languages: {
          English: "English",
          Polish: "Polish",
          German: "German",
          French: "French",
        },
      },
      Menu: {
        Title: "Lib manager",
        Logout: "Log out",
        Reservations: "Reservations",
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
