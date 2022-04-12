import React, { useEffect, useRef } from "react";
import { Generic, Text } from "../../types/formTypes";

function TextInput(props: {
  field: Text | Generic;
  value: string;
  handleChangeCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleKeyPressCB: (e: { key: string }) => void;
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
        type={"TEXT"}
        id={String(props.field.id)}
        name={props.field.label}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChangeCB(e);
        }}
        // onKeyPress={(e: { key: string }) => {
        //   props.handleKeyPressCB(e);
        // }}
        // placeholder={props.field.placeholder ? props.field.placeholder : ""}
      />
    </>
  );
}

export default TextInput;
