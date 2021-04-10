import { UserCredentials } from "./auth.types";

export function loginApi(creds: UserCredentials): Promise<string> {
  //   return axios
  //     .post(ApiRoutes.LOGIN, {
  //       username: creds.username,
  //       password: creds.password,
  //     })
  //     .then((response) => response.data);
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("loginJWT"), 1000)
  );
  // return Promise.reject("asdfs");
}

export function registerApi(creds: UserCredentials): Promise<string> {
  //   return axios
  //     .post(ApiRoutes.REGISTER, {
  //       username: creds.username,
  //       password: creds.password,
  //     })
  //     .then((response) => response.data);
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("registerJWT"), 500)
  );
  // return Promise.reject("asdfs");
}
