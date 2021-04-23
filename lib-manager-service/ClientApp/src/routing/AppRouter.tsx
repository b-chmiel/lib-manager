import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { UserType } from "../auth/state/auth.types";
import { selectIsAuthenticated } from "../auth/state/authSlice";
import LoginView from "../auth/views/LoginView/LoginView";
import RegisterView from "../auth/views/RegisterView/RegisterView";
import { useAppSelector } from "../config/hooks";
import { BookInventoryView } from "../librarian/views/BookInventoryView";
import { getBaseName } from "./AppRouter.helpers";
import { Routes } from "./routes";

export const AppRouter: React.FC = () => {
  const basename = getBaseName();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const userType = UserType.LIBRARIAN;

  return (
    <BrowserRouter basename={basename}>
      <Switch>
        <Route path={"/"} exact>
          <Redirect to={isAuth ? Routes.HOME_PAGE : Routes.LOGIN} />
        </Route>
        <Route path={Routes.HOME_PAGE}>
          {userType === UserType.LIBRARIAN ? (
            <BookInventoryView />
          ) : (
            <>Reader view</>
          )}
        </Route>
        <Route path={Routes.LOGIN}>
          <LoginView />
        </Route>
        <Route path={Routes.REGISTER}>
          <RegisterView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
