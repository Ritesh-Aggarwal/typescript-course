import React from "react";
import { TextAreaField } from "../types/formTypes";

function TextAreaInput(props: {
  field: TextAreaField;
  value: string;
  handleChangeCB: (e: { target: { id: string; value: any } }) => void;
}) {
  return (
    <>
      <textarea
        className="outline outline-slate-200 focus:ring-2 border rounded-md"
        id={String(props.field.id)}
        name={props.field.name}
        rows={props.field.rows ? props.field.rows : 4}
        cols={props.field.cols ? props.field.cols : 50}
        value={props.value}
        onChange={props.handleChangeCB}
      />
    </>
  );
}

export default TextAreaInput;
