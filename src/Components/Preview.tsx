import React, { useEffect, useReducer, useState } from "react";
import { Field, FormData } from "../types/formTypes";
import { navigate } from "raviger";
import { defaultFormsData } from "../constants";
import TextInput from "./CustomInputs/TextInput";
import DropdownInput from "./CustomInputs/DropdownInput";
import RadioInput from "./CustomInputs/RadioInput";
import TextAreaInput from "./CustomInputs/TextAreaInput";
import MultiSelectInput from "./CustomInputs/MultiSelectInput";

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

interface Answer {
  qid: number;
  question: string;
  answer: string;
}

type ActionType = {
  type: "UPDATE_VALUE";
  payload: {
    value: string;
    id: string;
  };
};

const reducer = (state: FormData, action: ActionType) => {
  switch (action.type) {
    case "UPDATE_VALUE": {
      return {
        ...state,
        formFields: state.formFields.map((field: Field) => {
          if (String(field.id) === action.payload.id) {
            return { ...field, value: action.payload.value };
          } else return field;
        }),
      };
    }
  }
};

const counterReducer = (state: number, action: { type: "INC" | "DEC" }) => {
  switch (action.type) {
    case "INC": {
      return state + 1;
    }
    case "DEC": {
      return state - 1;
    }
  }
};

function Preview(props: { formId: string }) {
  const [currentQuestion, counterDispatch] = useReducer(counterReducer, 0);
  const [state, dispatch] = useReducer(reducer, null, () =>
    initialState(props.formId)
  );
  const [previewAnswers, setPreviewAnswers] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<Field>(
    state.formFields[currentQuestion]
  );

  useEffect(() => {
    setQuestion((p) => state.formFields[currentQuestion]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const handleChange = (e: { target: { id: string; value: any } }) => {
    dispatch({
      type: "UPDATE_VALUE",
      payload: { value: e.target.value, id: e.target.id },
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < state.formFields.length - 1)
      counterDispatch({ type: "INC" });
  };

  const save = () => {
    setAnswers((p) =>
      state.formFields.map((i) => ({
        qid: i.id,
        question: i.name,
        answer: i.value,
      }))
    );
  };
  const saveAnswer = () => {
    save();
    nextQuestion();
  };

  const submitForm = () => {
    save();
    setPreviewAnswers(true);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      if (currentQuestion === state.formFields.length) {
        submitForm();
      } else saveAnswer();
    }
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
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChange}
                handleKeyPressCB={handleKeyPress}
              />
            ) : question.kind === "dropdown" ? (
              <DropdownInput
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChange}
              />
            ) : question.kind === "radio" ? (
              <RadioInput
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChange}
              />
            ) : question.kind === "textarea" ? (
              <TextAreaInput
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChange}
              />
            ) : question.kind === "multi-select" ? (
              <MultiSelectInput
                field={question}
                value={state.formFields[currentQuestion].value}
                handleChangeCB={handleChange}
              />
            ) : null}
            <div className="flex mt-4 gap-2 justify-between items-center">
              Question {currentQuestion + 1} of {state.formFields.length}
              <div className="flex gap-2">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => {
                      counterDispatch({ type: "DEC" });
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
          {answers.map((ans) => {
            return (
              <div className="mt-2" key={ans.qid}>
                <strong>{ans.question}</strong> : {ans.answer}
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
