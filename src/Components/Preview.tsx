import React, { useEffect, useRef, useState } from "react";
import { FormData } from "../types/formTypes";
import { navigate } from "raviger";
import { defaultFormsData } from "../constants";
import NotFound from "./NotFound";
interface Props {
  formId: string;
}
function Preview(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const initialState: () => FormData = () => {
    var JSONdata = localStorage.getItem("formsData");
    const data = JSONdata ? JSON.parse(JSONdata) : defaultFormsData;
    if (data.length > 0) {
      const form = data.find((item: FormData) => {
        return item.id === Number(props.formId);
      });
      return form;
    }
  };

  const [state, setState] = useState<FormData>(initialState);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestion]);

  const handleChangeInput = (e: { target: { id: string; value: any } }) => {
    setState((p) => ({
      ...p,
      formFields: p.formFields.map((field) => {
        if (String(field.id) === e.target.id) {
          return { ...field, value: e.target.value };
        } else return field;
      }),
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < state.formFields.length - 1)
      setCurrentQuestion((p) => p + 1);
  };

  const saveAnswer = () => {
    //move this logic to save , save all values together
    setAnswers((p) => [...p, state.formFields[currentQuestion].value]);
    nextQuestion();
  };

  if (state) {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={state.formFields[currentQuestion].name}
          className="text-lg mb-2 font-semibold mt-2"
        >
          {state.formFields[currentQuestion].name}
        </label>
        <input
          ref={inputRef}
          className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
          type={
            state.formFields[currentQuestion].type
              ? state.formFields[currentQuestion].type
              : "text"
          }
          id={String(state.formFields[currentQuestion].id)}
          name={state.formFields[currentQuestion].name}
          value={state.formFields[currentQuestion].value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
          onKeyPress={(e) => {
            if (currentQuestion === state.formFields.length - 1) {
              alert(answers);
              navigate("/");
            } else if (e.key === "Enter") saveAnswer();
          }}
          placeholder={
            state.formFields[currentQuestion].placeholder
              ? state.formFields[currentQuestion].placeholder
              : ""
          }
        />
        <div className="flex mt-4 gap-2 justify-end">
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
                ? () => {
                    alert(answers);
                    navigate("/");
                  }
                : saveAnswer
            }
          >
            {currentQuestion === state.formFields.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    );
  } else
    return (
      <NotFound
    );
}

export default Preview;
