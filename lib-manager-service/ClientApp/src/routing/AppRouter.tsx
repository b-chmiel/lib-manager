import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LoginView from "../auth/views/LoginView/LoginView";
import RegisterView from "../auth/views/RegisterView/RegisterView";
import { getBaseName } from "./AppRouter.helpers";
import { Routes } from "./routes";

export const AppRouter: React.FC = () => {
  const basename = getBaseName();
  return (
    <BrowserRouter basename={basename}>
      <Switch>
        <Route path={Routes.HOME_PAGE} exact>
          <Redirect to={Routes.LOGIN}></Redirect>
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
