import React from "react";
import AppContainer from "./Components/AppContainer";
import Form, { Field } from "./Components/Form";
import Header from "./Components/Header";

function App() {
  // const fields: Field[] = [];
  return (
    <AppContainer>
      <div className="w-3/5 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Level 2 milestone" />
        <Form />
      </div>
    </AppContainer>
  );
}

export default App;
