import React from "react";
import { Field } from "./Form";

interface Props {
  field: Field;
  removeFieldCB: (id: number) => void;
  value: string;
  handleChangeCB: (e: { target: { id: string; value: any } }) => void;
}

function LabelledInput(props: Props) {
  return (
    <>
      <label htmlFor={props.field.name}>{props.field.name}</label>
      <div className="flex gap-2 my-2">
        <input
          className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
          type={props.field.type ? props.field.type : "text"}
          id={String(props.field.id)}
          name={props.field.name}
          value={props.field.value}
          onChange={(e) => props.handleChangeCB(e)}
          placeholder={props.field.placeholder ? props.field.placeholder : ""}
        ></input>
        <button
          onClick={(_) => props.removeFieldCB(props.field.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white  rounded-lg px-4 py-2"
        >
          Remove
        </button>
      </div>
    </>
  );
}

export default LabelledInput;
