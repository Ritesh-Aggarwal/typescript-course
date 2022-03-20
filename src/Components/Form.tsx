import React, { useEffect, useRef, useState } from "react";
import { deafultFormsData } from "../constants";
import LabelledInput from "./LabelledInput";

export interface Field {
  id: number;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
}

export interface FormData {
  id: number;
  title: string;
  formFields: Field[];
}

interface Props {
  form: FormData;
  closeFormCB: () => void;
  saveFormCB: (data: FormData[]) => void;
}

function Form(props: Props) {
  const [newField, setNewField] = useState<string>("");
  const [state, setState] = useState<FormData>(props.form);
  const titleRef = useRef<any>(null);

  const saveForm = (data: FormData) => {
    const d: string | null = localStorage.getItem("formsData");
    var oldData: FormData[] = d ? JSON.parse(d) : deafultFormsData;
    const newData: FormData[] = [
      ...oldData.filter((item: FormData) => {
        return item.id !== data.id;
      }),
      data,
    ];
    localStorage.setItem("formsData", JSON.stringify(newData));
    props.saveFormCB(newData);
  };

  const saveAsNewForm = () => {
    setState((p) => ({ ...p, id: Number(new Date()) }));
  };

  useEffect(() => {}, [props.form]);

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
    saveForm(state);
    //save form when "save as new form" , using useEffect because state change doesn't take place immediately
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveForm(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
    //escape auto-save when title is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.formFields, state.id]);

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
          onClick={saveAsNewForm}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Save as new form
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
