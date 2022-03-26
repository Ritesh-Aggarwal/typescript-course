import React, { useEffect, useState } from "react";
import { Field, FormData } from "../types/formTypes";
import { navigate } from "raviger";
import { defaultFormsData } from "../constants";
import TextInput from "./TextInput";
import DropdownInput from "./DropdownInput";
import RadioInput from "./RadioInput";
import TextAreaInput from "./TextAreaInput";
import MultiSelectInput from "./MultiSelectInput";

const initialState: (formId: string) => FormData = (formId) => {
  var JSONdata = localStorage.getItem("formsData");
  const data = JSONdata ? JSON.parse(JSONdata) : defaultFormsData;
  if (data.length > 0) {
    const form = data.find((item: FormData) => {
      return item.id === Number(formId);
    });
    return form;
  }
};

// type ActionTypes = null

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "": {
//     }
//   }
// };

// const cqReducer = (state, action) => {
//     switch (action.type) {
//       case "": {
//       }
//     }
//   };

function Preview(props: { formId: string }) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const [previewAnswers, setPreviewAnswers] = useState<boolean>(false);
  const [state, setState] = useState<FormData>(() =>
    initialState(props.formId)
  );

  const [question, setQuestion] = useState<Field>(
    state.formFields[currentQuestion]
  );

  useEffect(() => {
    setQuestion((p) => state.formFields[currentQuestion]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const handleChangeInput = (e: { target: { id: string; value: any } }) => {
    setState((p) => ({
      ...p,
      formFields: p.formFields.map((field) => {
        if (String(field.id) === e.target.id) {
          // console.log(e.target.value);
          return { ...field, value: e.target.value };
        } else return field;
      }),
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < state.formFields.length - 1)
      setCurrentQuestion((p) => p + 1);
  };
  const save = () => {
    setAnswers((p) => state.formFields.map((i) => i.value));
  };
  const saveAnswer = () => {
    save();
    nextQuestion();
  };

  const submitForm = () => {
    save();
    setPreviewAnswers(true);
  };
  return (
    <>
      {!previewAnswers ? (
        state.formFields.length ? (
          <div className="flex flex-col">
            <label
              htmlFor={state.formFields[currentQuestion].name}
              className="text-lg mb-2 font-semibold mt-2"
            >
              {state.formFields[currentQuestion].name}
            </label>
            {question.kind === "text" ? (
              <TextInput
                handleChangeInputCB={handleChangeInput}
                field={question}
                value={state.formFields[currentQuestion].value}
                currentQuestion={currentQuestion}
                totalQuestion={state.formFields.length - 1}
                submitFormCB={submitForm}
                saveAnswerCB={saveAnswer}
              />
            ) : question.kind === "dropdown" ? (
              <DropdownInput
                id={question.id}
                handleChangeCB={handleChangeInput}
                options={question.options}
                name={question.name}
              />
            ) : question.kind === "radio" ? (
              <RadioInput handleChangeCB={handleChangeInput} field={question} />
            ) : question.kind === "textarea" ? (
              <TextAreaInput
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChangeInput}
              />
            ) : question.kind === "multi-select" ? (
              <MultiSelectInput
                field={question}
                handleChangeCB={handleChangeInput}
                value={state.formFields[currentQuestion].value}
              />
            ) : null}
            <div className="flex mt-4 gap-2 justify-between items-center">
              Question {currentQuestion + 1} of {state.formFields.length}
              <div className="flex gap-2">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      setCurrentQuestion((p) => p - 1);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                  >
                    Back
                  </button>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                  onClick={
                    currentQuestion === state.formFields.length - 1
                      ? submitForm
                      : saveAnswer
                  }
                >
                  {currentQuestion === state.formFields.length - 1
                    ? "Submit"
                    : "Next"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>No questions in the form</>
        )
      ) : (
        <>
          {answers.map((ans, index) => {
            return (
              <div className="mt-2" key={index}>
                <strong>{state.formFields[index].name}</strong> : {ans}
              </div>
            );
          })}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2 mt-4"
            onClick={() => {
              navigate("/");
            }}
          >
            Go home
          </button>
        </>
      )}
    </>
  );
}

export default Preview;
