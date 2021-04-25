import axios from "axios";
import { ParsedJwtToken, User, UserType } from "./auth.types";

export function storeToken(token: string | null) {
  if (token === null) {
    localStorage.removeItem("JWT");
  } else {
    localStorage.setItem("JWT", token);
  }
}

export function retrieveToken(): string | null {
  return localStorage.getItem("JWT");
}

export function setAxiosToken(token: string | null) {
  if (token === null) {
    axios.defaults.headers["Authorization"] = null;
  } else {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export function getUserInfo(token: string | null) {
  const parsed = parseToken(token);

  if (parsed == null) {
    return undefined;
  }

  return {
    name: parsed.email,
    type: getUserTypeFromJwtField(
      parsed["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    ),
  } as User;
}

function parseToken(token: string | null): ParsedJwtToken | null {
  if (token === null) {
    return null;
  } else {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

function getUserTypeFromJwtField(field: string): UserType {
  if (field === "Administrator") {
    return UserType.LIBRARIAN;
  } else if (field === "User") {
    return UserType.READER;
  }

  return UserType.UNRECOGNISED;
}
