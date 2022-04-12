import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import FormsList from "./Components/FormsList";
// import Form from "./Components/FormComponent/Form";
import About from "./Components/About";
// import Preview from "./Components/PreviewForm/Preview";
import Login from "./Components/Login";
import { User } from "./types/userTypes";
import EditForm from "./Components/FormComponent/EditForm";
import PreviewForm from "./Components/PreviewForm/PreviewForm";
import Submission from "./Components/Submission";

const routes = {
  "/": () => <FormsList />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <EditForm formId={id} />,
  "/form/:id/submissions": ({ id }: { id: string }) => (
    <Submission formId={id} />
  ),
  // "/form/:id": ({ id }: { id: string }) => <Form formId={id} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
    // <Preview formId={formId} />
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
