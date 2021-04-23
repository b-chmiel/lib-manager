import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserType } from "../../auth/state/auth.types";
import {
  selectAuthUserType,
  selectIsAuthenticated,
} from "../../auth/state/authSlice";
import { useAppSelector } from "../../config/hooks";
import { Routes } from "../routes";
interface Props {
  path: string;
  userType: UserType;
}

const RestrictedRoute: React.FC<Props> = ({ path, children, userType }) => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const authUserType = useAppSelector(selectAuthUserType);
  return (
    <Route path={path}>
      {isAuth && userType === authUserType ? (
        children
      ) : (
        <Redirect to={Routes.LOGIN} />
      )}
    </Route>
  );
};

export default RestrictedRoute;
