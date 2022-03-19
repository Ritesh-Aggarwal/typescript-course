import React, { useState } from "react";
import AppContainer from "./Components/AppContainer";
import Form from "./Components/Form";
import Header from "./Components/Header";
import Home from "./Components/Home";

function App() {
  const [state, setState] = useState("HOME");
  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };
  return (
    <AppContainer>
      <div className="backdrop-blur-lg w-3/5 p-4 mx-auto bg-white/30 shadow-lg rounded-xl">
        <Header title="Level 3 milestone" />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
