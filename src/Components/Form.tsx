import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields: Field[] = [
  {
    id: 1,
    name: "First Name",
    placeholder: "John",
    value: "",
  },
  {
    id: 2,
    name: "Last",
    placeholder: "Doe",
    value: "",
  },
  {
    id: 3,
    name: "Email",
    type: "email",
    placeholder: "john.doe@gmail.com",
    value: "",
  },
  {
    id: 4,
    name: "Date of Birth",
    type: "date",
    value: "",
  },
];
export interface Field {
  id: number;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
}

interface Props {
  closeFormCB: () => void;
}

const initialState: () => Field[] = () => {
  const data = localStorage.getItem("formFields");
  return data ? JSON.parse(data) : formFields;
};

const saveForm = (data: Field[]) => {
  localStorage.setItem("formFields", JSON.stringify(data));
};

function Form(props: Props) {
  const [newField, setNewField] = useState<string>("");

  const [state, setState] = useState<Field[]>(initialState());
  const addField = () => {
    setState((p) => {
      return [...p, { id: Number(new Date()), name: newField, value: "" }];
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState((p) => p.filter((item) => item.id !== id));
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewField(e.target.value);
  };

  const handleChangeInput = (e: { target: { id: string; value: any } }) => {
    setState((p) =>
      p.map((field) => {
        if (String(field.id) === e.target.id) {
          return { ...field, value: e.target.value };
        } else return field;
      })
    );
  };

  const clearForm = () => {
    setState((p) =>
      p.map((field) => {
        return { ...field, value: "" };
      })
    );
  };

  return (
    <div>
      {state.map((field, idx) => {
        return (
          <div key={idx} className="">
            <LabelledInput
              handleChangeCB={handleChangeInput}
              value={field.value}
              removeFieldCB={removeField}
              field={field}
            />
          </div>
        );
      })}
      <div className="border-y flex gap-2 p-2 mt-2">
        <input
          value={newField}
          onChange={handleChange}
          className="outline text-black  outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg my-2"
          type="text"
        />
        <button
          onClick={addField}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={(_) => saveForm(state)}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Save
        </button>
        <button
          onClick={clearForm}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Clear form
        </button>
        <button
          onClick={props.closeFormCB}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Close form
        </button>
      </div>
    </div>
  );
}

export default Form;
