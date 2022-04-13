import { useRoutes } from "raviger";
import React from "react";
import AppContainer from "./Components/AppContainer";
import Header from "./Components/Header";
// import FormsList from "./Components/FormsList";
import About from "./Components/About";
// import Login from "./Components/Login";
import { User } from "./types/userTypes";
// import EditForm from "./Components/FormComponent/EditForm";
import PreviewForm from "./Components/PreviewForm/PreviewForm";
import Submission from "./Components/Submission";
import NotFound from "./Components/NotFound";
import LoadingList from "./Components/LoadingList";

const Home = React.lazy(() => import("./Components/FormsList"));
const LoginPage = React.lazy(() => import("./Components/Login"));
const EditPage = React.lazy(
  () => import("./Components/FormComponent/EditForm")
);

const publicRoutes = {
  "/": () => (
    <React.Suspense fallback={<LoadingList />}>
      <Home />
    </React.Suspense>
  ),
  "/login": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </React.Suspense>
  ),
  "/about": () => <About />,
  "/form/:id/submissions": ({ id }: { id: string }) => (
    <Submission formId={id} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={formId} />
  ),
};
const privateRoutes = {
  "/form/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <EditPage formId={id} />
    </React.Suspense>
  ),
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
