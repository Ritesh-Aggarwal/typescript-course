import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import FormsList from "./Components/FormsList";
import Form from "./Components/Form";
import About from "./Components/About";
import Preview from "./Components/Preview";
import Login from "./Components/Login";
import { User } from "./types/userTypes";

const routes = {
  "/": () => <FormsList />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form formId={id} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Preview formId={formId} />
  ),
};

function AppRouter(props: { currentUser: User }) {
  const routeResults = useRoutes(routes);
  return (
    <AppContainer>
      <Header currentUser={props.currentUser} />
      {routeResults}
    </AppContainer>
  );
}

export default AppRouter;
