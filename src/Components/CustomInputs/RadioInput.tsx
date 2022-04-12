import React from "react";
import { Radio } from "../../types/formTypes";

function RadioInput(props: {
  field: Radio;
  handleChangeCB: (e: { target: { id: string; value: string } }) => void;
  value: string;
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
              name={props.field.label}
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
