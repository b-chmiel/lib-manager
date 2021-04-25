import { UserType } from "../../../auth/state/auth.types";

export function getUserType(userType: UserType) {
  switch (userType) {
    case UserType.LIBRARIAN:
      return "Librarian";
    case UserType.READER:
      return "Reader";
  }
}
