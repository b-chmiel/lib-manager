import { UserCredentials } from "./auth.types";

const mockedLibrarianToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkxJQlJBUklBTiIsImlhdCI6MTUxNjIzOTAyMn0.xLHANNbGSSRp5xm_Yo7RZ-iMH88jkds06FENEiSlJQ4";

const mockedUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gWm9ybiIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNTE2MjM5MDIyfQ.dWSgLK1mYYGNyQD26PVnq9ulf4ySR_5em10U9p1cDHQ";

export function loginApi(creds: UserCredentials): Promise<string> {
  //  return axios
  //    .post(ApiRoutes.LOGIN, {
  //      username: creds.username,
  //      password: creds.password,
  //    })
  //    .then((response) => response.data);

  // return Promise.reject("asdfs");
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      if (creds.username === "librarian") {
        resolve(mockedLibrarianToken);
      } else {
        resolve(mockedUserToken);
      }
    }, 200)
  );
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
