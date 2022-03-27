import React from "react";
import { RadioField } from "../types/formTypes";

function RadioInput(props: {
  field: RadioField;
  handleChangeCB: (e: { target: { id: string; value: any } }) => void;
  value:string;
}) {
  return (
    <div>
      {props.field.options.map((option, idx) => {
        return (
          <div key={idx} className="my-2">
            <input
              onChange={props.handleChangeCB}
              type="radio"
              id={String(props.field.id)}
              name={props.field.name}
              value={option}
              checked={props.value === option}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}

export default RadioInput;
