import React from "react";

function DropdownInput(props: {
  options: string[];
  name: string;
  id: number;
  handleChangeCB: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <select
        id={String(props.id)}
        name={props.name}
        onChange={(e) => {
          props.handleChangeCB(e);
        }}
        className="w-full focus:ring-2 rounded-md p-2 hover:cursor-pointer border"
      >
        <option value="">Select an option</option>
        {props.options.map((option, idx) => {
          return (
            <option key={idx} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default DropdownInput;
