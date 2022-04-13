import React from "react";
import { FormField } from "../types/formTypes";

interface Props {
  field: FormField;
  index: number;
  deleteFieldCB: (id: number) => void;
  value: string;
  handleChangeCB: (e: { target: { id: string; value: string } }) => void;
  handleOptionChangeCB: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput(props: Props) {
  return (
    <>
      <div className="flex gap-2">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
        <div className="font-medium">Question {props.index + 1}</div>
      </div>
      <div className="flex gap-2 my-2">
        <input
          className="outline outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
          type="text"
          id={String(props.field.id)}
          name={props.field.label}
          value={props.field.label}
          onChange={(e: { target: { id: string; value: string } }) => {}}
        ></input>
        <button
          onClick={(_) => {
            props.deleteFieldCB(props.field.id);
          }}
          className="bg-red-500 hover:bg-red-700 text-white  rounded-lg px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      {props.field.kind === "DROPDOWN" || props.field.kind === "RADIO" ? (
        <div className="ml-6">
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
              name={props.field.label}
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
