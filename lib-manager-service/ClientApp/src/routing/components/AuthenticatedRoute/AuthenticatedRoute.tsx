import React from "react";
import { Redirect, Route } from "react-router-dom";
import { selectIsAuthenticated } from "../../../auth/state/authSelectors";
import { Menu } from "../../../common/components/Menu/Menu";
import { useAppSelector } from "../../../config/hooks";
import { Routes } from "../../routes";

interface Props {
  path: string;
}

const AuthenticatedRoute: React.FC<Props> = ({ path, children }) => {
  const isAuth = useAppSelector(selectIsAuthenticated);

  return (
    <Route path={path}>
      {isAuth ? <Menu>{children}</Menu> : <Redirect to={Routes.LOGIN} />}
    </Route>
  );
};

export default AuthenticatedRoute;
