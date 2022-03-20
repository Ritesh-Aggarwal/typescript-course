import React, { useState } from "react";
import AppContainer from "./Components/AppContainer";
import Form, { FormData } from "./Components/Form";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { deafultFormsData } from "./constants";
import FormsList from "./Components/FormsList";

const initialState: () => FormData[] = () => {
  const data = localStorage.getItem("formsData");
  return data ? JSON.parse(data) : deafultFormsData;
};

function App() {
  //change forms when saved new form and come back to this page
  const [forms, setForms] = useState<FormData[]>(() => initialState());
  const [state, setState] = useState("HOME");
  const [activeForm, setActiveForm] = useState<FormData>(forms[0]);

  const saveForms = (data: FormData[]) => {
    setForms(data);
  };

  const openForm = (id: number) => {
    setState("FORM");
    setActiveForm(
      forms.filter((item) => {
        return item.id === id;
      })[0]
    );
  };

  const goHome = () => {
    setState("HOME");
  };

  const openFormList = () => {
    setState("FORM-LIST");
  };

  const closeForm = () => {
    setState("FORM-LIST");
  };

  const deleteForm = (id: number) => {
    const JSONdata = localStorage.getItem("formsData");
    let data: FormData[] = JSONdata ? JSON.parse(JSONdata) : [];
    data = data.filter((form: FormData) => {
      return form.id !== id;
    });
    localStorage.setItem("formsData", JSON.stringify(data));
    setForms(data);
  };
  return (
    <AppContainer>
      <div className="backdrop-blur-lg w-3/5 p-4 mx-auto bg-white/30 shadow-lg rounded-xl">
        <Header title="Level 3 milestone" />
        {state === "HOME" ? (
          <Home openFormCB={openFormList} />
        ) : state === "FORM" ? (
          <Form
            form={activeForm}
            closeFormCB={closeForm}
            saveFormCB={saveForms}
          />
        ) : (
          <FormsList
            deleteFormCB={deleteForm}
            goHomeCB={goHome}
            openFormCB={openForm}
            formList={forms}
          />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
