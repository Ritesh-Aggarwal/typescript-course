import React from "react";
import { DropdownField } from "../../types/formTypes";

function DropdownInput(props: {
  field: DropdownField;
  handleChangeCB: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  return (
    <div>
      <select
        id={String(props.field.id)}
        name={props.field.name}
        onChange={(e) => {
          props.handleChangeCB(e);
        }}
        className="w-full focus:ring-2 rounded-md p-2 hover:cursor-pointer border"
      >
        <option value="">Select an option</option>
        {props.field.options.map((option, idx) => {
          return (
            <option key={idx} value={option} selected={props.value === option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropdownInput;
