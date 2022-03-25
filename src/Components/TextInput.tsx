import React, { useEffect, useRef } from "react";
import { TextField } from "../types/formTypes";

function TextInput(props: {
  field: TextField;
  value: string;
  handleChangeInputCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentQuestion: number;
  totalQuestion: number;
  submitFormCB: () => void;
  saveAnswerCB: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [props]);

  return (
    <>
      <input
        ref={inputRef}
        className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
        type={props.field.type ? props.field.type : "text"}
        id={String(props.field.id)}
        name={props.field.name}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChangeInputCB(e);
        }}
        onKeyPress={(e: { key: string }) => {
          if (e.key === "Enter") {
            if (props.currentQuestion === props.totalQuestion) {
              props.submitFormCB();
            } else props.saveAnswerCB();
          }
        }}
        placeholder={props.field.placeholder ? props.field.placeholder : ""}
      />
    </>
  );
}

export default TextInput;
