import axios from "axios";
import { ApiRoutes } from "../../routing/routes";
import { AuthSuccessResponse, UserCredentials } from "./auth.types";

export function loginApi(
  creds: UserCredentials
): Promise<AuthSuccessResponse | null> {
  return axios
    .post(ApiRoutes.LOGIN, {
      username: creds.username,
      password: creds.password,
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}

export function registerApi(
  creds: UserCredentials
): Promise<AuthSuccessResponse | null> {
  return axios
    .post(ApiRoutes.REGISTER, {
      username: creds.username,
      password: creds.password,
    })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data));
}
