import React from "react";
import AppContainer from "./Components/AppContainer";
import FormFields, { Field } from "./Components/FormFields";
import Header from "./Components/Header";

function App() {
  const fields: Field[] = [
    {
      name: "First Name",
      placeholder: "John",
    },
    {
      name: "Last",
      placeholder: "Doe",
    },
    {
      name: "Email",
      type: "email",
      placeholder: "john.doe@gmail.com",
    },
    {
      name: "Date of Birth",
      type: "date",
    },
  ];
  return (
    <AppContainer>
      <div className="w-96 p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Level 1 milestone" />
        <FormFields fields={fields} />
      </div>
    </AppContainer>
  );
}

export default App;
