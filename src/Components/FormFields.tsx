import React from "react";

export interface Field {
  name: string;
  type?: string;
  placeholder?: string;
}

interface Props {
  fields: Field[];
}

function FormFields(props: Props) {
  return (
    <form action="">
      {props.fields.map((field, idx) => {
        return (
          <div key={idx} className="flex flex-col">
            <label htmlFor={field.name}>{field.name}</label>
            <input
              className="outline  outline-slate-200 focus:ring-2 rounded-md px-2 my-2"
              type={field.type ? field.type : "text"}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder ? field.placeholder : ""}
            ></input>
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2 mt-2"
      >
        Submit
      </button>
    </form>
  );
}

export default FormFields;
