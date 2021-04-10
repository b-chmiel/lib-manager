import axios from "axios";

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
