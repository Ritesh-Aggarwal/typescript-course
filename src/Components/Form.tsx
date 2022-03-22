import React, { useEffect, useRef, useState } from "react";
import { defaultFormsData } from "../constants";
import LabelledInput from "./LabelledInput";
import { Link } from "raviger";
import { FormData } from "../types/formTypes";

interface Props {
  formId: string;
}

function Form(props: Props) {
  const initialState: (id: number) => FormData = (id) => {
    var JSONdata = localStorage.getItem("formsData");
    const data = JSONdata ? JSON.parse(JSONdata) : defaultFormsData;
    localStorage.setItem("formsData", JSON.stringify(data));
    const form = data.filter((item: FormData) => {
      return item.id === id;
    })[0];
    return form;
  };

  const [newField, setNewField] = useState<string>("");
  const [state, setState] = useState<FormData>(() =>
    initialState(Number(props.formId))
  );
  const titleRef = useRef<HTMLInputElement>(null);

  const saveForm = (data: FormData) => {
    const d: string | null = localStorage.getItem("formsData");
    var oldData: FormData[] = d ? JSON.parse(d) : defaultFormsData;
    const newData: FormData[] = [
      ...oldData.filter((item: FormData) => {
        return item.id !== data.id;
      }),
      data,
    ];
    localStorage.setItem("formsData", JSON.stringify(newData));
  };

  const addField = () => {
    setState((p) => {
      return {
        ...p,
        formFields: [
          ...p.formFields,
          { id: Number(new Date()), name: newField, value: "" },
        ],
      };
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState((p) => ({
      ...p,
      formFields: p.formFields.filter((item) => item.id !== id),
    }));
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewField(e.target.value);
  };

  const handleChangeInput = (e: { target: { id: string; value: any } }) => {
    setState((p) => ({
      ...p,
      formFields: p.formFields.map((field) => {
        if (String(field.id) === e.target.id) {
          return { ...field, value: e.target.value };
        } else return field;
      }),
    }));
  };

  const clearForm = () => {
    setState((p) => ({
      ...p,
      formFields: p.formFields.map((field) => {
        return { ...field, value: "" };
      }),
    }));
  };

  useEffect(() => {
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveForm(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <div>
      <input
        ref={titleRef}
        value={state.title}
        onChange={(e) => {
          setState((p) => ({ ...p, title: e.target.value }));
        }}
        className="outline text-black  outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg my-2"
        type="text"
      />
      {state.formFields.map((field, idx) => {
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
        <Link
          href="/"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Close form
        </Link>
      </div>
    </div>
  );
}

export default Form;
