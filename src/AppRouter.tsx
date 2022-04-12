import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import FormsList from "./Components/FormsList";
import About from "./Components/About";
import Login from "./Components/Login";
import { User } from "./types/userTypes";
import EditForm from "./Components/FormComponent/EditForm";
import PreviewForm from "./Components/PreviewForm/PreviewForm";
import Submission from "./Components/Submission";
import NotFound from "./Components/NotFound";

// const routes = {
//   "/": () => <FormsList />,
//   "/login": () => <Login />,
//   "/about": () => <About />,
//   "/form/:id": ({ id }: { id: string }) => <EditForm formId={id} />,
//   "/form/:id/submissions": ({ id }: { id: string }) => (
//     <Submission formId={id} />
//   ),
//   "/preview/:formId": ({ formId }: { formId: string }) => (
//     <PreviewForm formId={formId} />
//   ),
// };

const publicRoutes = {
  "/": () => <FormsList />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id/submissions": ({ id }: { id: string }) => (
    <Submission formId={id} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
  ),
};
const privateRoutes = {
  "/form/:id": ({ id }: { id: string }) => <EditForm formId={id} />,
};

function AppRouter(props: { currentUser: User }) {
  const routeResults = useRoutes(
    props.currentUser.username !== ""
      ? { ...privateRoutes, ...publicRoutes }
      : publicRoutes
  );
  return (
    <AppContainer>
      <Header currentUser={props.currentUser} />
      {routeResults || <NotFound />}
    </AppContainer>
  );
}

export default AppRouter;
