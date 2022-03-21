import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import FormsList from "./Components/FormsList";
import Form from "./Components/Form";
import About from "./Components/About";
import Preview from "./Components/Preview";

const routes = {
  "/": () => <FormsList />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form formId={id} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Preview formId={formId} />
  ),
};

function AppRouter() {
  const routeResults = useRoutes(routes);
  return (
    <AppContainer>
      <Header />
      {routeResults}
    </AppContainer>
  );
}

export default AppRouter;
