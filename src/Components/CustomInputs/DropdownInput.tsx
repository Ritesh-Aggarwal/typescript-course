import React from "react";
import { Dropdown } from "../../types/formTypes";

function DropdownInput(props: {
  field: Dropdown;
  handleChangeCB: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  return (
    <div>
      <select
        id={String(props.field.id)}
        name={props.field.label}
        onChange={(e) => {
          props.handleChangeCB(e);
        }}
        className="w-full focus:ring-2 rounded-md p-2 hover:cursor-pointer border"
      >
        <option value="">Select an option</option>
        {props.field.options.map((option, idx) => {
          return (
            <option
              key={idx}
              value={option}
              defaultValue={props.value}
              // selected={props.value === option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropdownInput;
