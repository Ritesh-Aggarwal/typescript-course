import React from "react";
import { Field } from "../types/formTypes";

interface Props {
  field: Field;
  removeFieldCB: (id: number) => void;
  value: string;
  handleChangeCB: (e: { target: { id: string; value: any } }) => void;
  handleOptionChangeCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput(props: Props) {
  return (
    <>
      {/* <label htmlFor={props.field.name}>{"field"}</label> */}
      <div className="flex gap-2 my-2">
        <input
          className="outline outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
          type="text"
          id={String(props.field.id)}
          name={props.field.name}
          value={props.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleChangeCB(e)
          }
        ></input>
        <button
          onClick={(_) => props.removeFieldCB(props.field.id)}
          className="bg-red-500 hover:bg-red-700 text-white  rounded-lg px-4 py-2"
        >
          🗑️
        </button>
      </div>
      {props.field.kind === "dropdown" ||
      props.field.kind === "multi-select" ||
      props.field.kind === "radio" ? (
        <div className="">
          {props.field.options.length > 0 &&
          props.field.options[0] !== "" ? null : (
            <div className="bg-red-200 text-red-500 px-4 py-2">
              Add atleast one option
            </div>
          )}
          <div className="">Add field options (seperated by ",") :</div>
          <div className="my-2">
            <input
              className="outline w-full text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
              type="text"
              id={String(props.field.id)}
              name={props.field.name}
              value={props.field.options.join(",")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.handleOptionChangeCB(e);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default LabelledInput;
