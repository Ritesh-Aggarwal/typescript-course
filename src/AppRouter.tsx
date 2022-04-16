import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
import About from "./Components/About";
import { User } from "./types/userTypes";
import NotFound from "./Components/NotFound";
import LoadingList from "./Components/LoadingList";

const Home = React.lazy(() => import("./Components/FormsList"));
const LoginPage = React.lazy(() => import("./Components/Login"));
const EditPage = React.lazy(
  () => import("./Components/FormComponent/EditForm")
);
const SubmissionPage = React.lazy(() => import("./Components/Submission"));
const PreviewFormPage = React.lazy(
  () => import("./Components/PreviewForm/PreviewForm")
);
const publicRoutes = {
  "/": () => (
    <React.Suspense fallback={<LoadingList />}>
      <Home />
    </React.Suspense>
  ),
  "/login": () => <LoginPage />,
  "/about": () => <About />,
  "/form/:id/submissions": ({ id }: { id: string }) => (
    <SubmissionPage formId={id} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewFormPage formId={formId} />
  ),
};
const privateRoutes = {
  "/form/:id": ({ id }: { id: string }) => <EditPage formId={id} />,
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
      <React.Suspense fallback={<div>Loading...</div>}>
        {routeResults || <NotFound />}
      </React.Suspense>
    </AppContainer>
  );
}

export default AppRouter;
