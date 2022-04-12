import { navigate } from "raviger";
import React, { useEffect, useReducer, useState } from "react";
import { FormField } from "../../types/formTypes";
import { submitAnswers } from "../../utils/apiUtils";
import DropdownInput from "../CustomInputs/DropdownInput";
import RadioInput from "../CustomInputs/RadioInput";
import TextInput from "../CustomInputs/TextInput";
import { formFields } from "../FormComponent/EditForm";
import { counterReducer } from "./Preview";

type Props = {
  formId: string;
};
export type Answer = {
  question: string;
  form_field: number;
  value: string;
};
function PreviewForm({ formId }: Props) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [currentQuestion, counterDispatch] = useReducer(counterReducer, 0);
  const [previewAnswers, setPreviewAnswers] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>();
  const [question, setQuestion] = useState<FormField>(() => {
    return fields[currentQuestion];
  });
  useEffect(() => {
    setQuestion(fields[currentQuestion]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, fields]);
  useEffect(() => {
    formFields(formId, setFields);
  }, [formId]);

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFields((p) => [
      ...p.map((field: FormField) => {
        if (String(field.id) === e.target.id) {
          return { ...field, value: e.target.value };
        } else return field;
      }),
    ]);
  };

  const saveAnswers = () => {
    setAnswers((p) =>
      fields.map((i) => ({
        form_field: i.id,
        question: i.label,
        value: i.value,
      }))
    );
    setPreviewAnswers((p) => !p);
  };

  const submit = async () => {
    try {
      if (answers) {
        const a = answers.map((item) => ({
          form_field: item.form_field,
          value: item.value,
        }));
        submitAnswers(formId, a);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!previewAnswers ? (
        fields && fields.length > 0 ? (
          <div className="flex flex-col">
            <div className="font-semibold">{fields[currentQuestion].label}</div>
            <div className="flex my-4">
              {question ? (
                question.kind === "TEXT" ? (
                  <TextInput
                    field={question}
                    value={fields[currentQuestion].value}
                    handleChangeCB={handleChange}
                  />
                ) : question.kind === "DROPDOWN" ? (
                  <DropdownInput
                    field={question}
                    value={fields[currentQuestion].value}
                    handleChangeCB={handleChange}
                  />
                ) : question.kind === "RADIO" ? (
                  <RadioInput
                    field={question}
                    value={fields[currentQuestion].value}
                    handleChangeCB={handleChange}
                  />
                ) : question.kind === "GENERIC" ? (
                  <TextInput
                    field={question}
                    value={fields[currentQuestion].value}
                    handleChangeCB={handleChange}
                  />
                ) : null
              ) : null}
            </div>
            <button
              onClick={() => {
                if (currentQuestion === fields.length - 1) {
                  saveAnswers();
                } else if (currentQuestion < fields.length - 1)
                  counterDispatch({ type: "INC" });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              {currentQuestion === fields.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        ) : null
      ) : (
        <>
          {answers?.map((ans, idx) => {
            return (
              <div className="mt-2" key={idx}>
                <strong>{ans.question}</strong> : {ans.value}
              </div>
            );
          })}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2 mt-4"
            onClick={() => {
              submit();
            }}
          >
            Save
          </button>
        </>
      )}
    </>
  );
}

export default PreviewForm;
