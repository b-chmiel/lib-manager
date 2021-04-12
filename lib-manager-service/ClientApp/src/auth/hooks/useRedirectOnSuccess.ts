import { useEffect } from "react";
import { useHistory } from "react-router";
import { Routes } from "../../routing/routes";
import { AuthStatus } from "../state/auth.types";

export const useRedirectOnSuccess = (authStatus: AuthStatus, route: Routes) => {
  const history = useHistory();
  useEffect(() => {
    if (authStatus === AuthStatus.SUCCESS) {
      history.push(route);
    }
  }, [authStatus, history, route]);
};
