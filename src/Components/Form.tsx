import React, { useEffect, useRef, useState } from "react";
import { defaultFormsData } from "../constants";
import LabelledInput from "./LabelledInput";
import { Link } from "raviger";
import { FormData } from "../types/formTypes";
import NotFound from "./NotFound";

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
  const [newFieldType, setNewFieldType] = useState<string>("");
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
    var obj: any = {
      id: Number(new Date()),
      name: newField,
      value: "",
      kind: newFieldType === "" ? "text" : newFieldType,
    };
    if (["radio", "multi-select", "dropdown"].includes(newFieldType)) {
      obj = { ...obj, options: [] };
    }
    setState((p) => {
      return {
        ...p,
        formFields: [...p.formFields, obj],
      };
    });
    setNewField("");
    setNewFieldType("");
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
          return { ...field, name: e.target.value };
          // return { ...field, value: e.target.value };
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
  if (state) {
    return (
      <div>
        <div className="inline mr-4 font-semibold">Form title :</div>
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
            <div key={idx} className="my-4">
              <div className="font-semibold">Question {idx + 1}</div>
              <div className="border-y">
                <div className=""></div>
                <LabelledInput
                  handleChangeCB={handleChangeInput}
                  value={field.name}
                  removeFieldCB={removeField}
                  field={field}
                />
                {field.kind === "dropdown" ||
                field.kind === "multi-select" ||
                field.kind === "radio" ? (
                  <div className="">
                    <div className="">
                      Add field options (seperated by ",") :
                    </div>
                    <div className="my-2">
                      <input
                        className="outline w-full text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
                        type="text"
                        id={String(field.id)}
                        name={field.name}
                        value={field.options.join(",")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setState((p) => ({
                            ...p,
                            formFields: p.formFields.map((field) => {
                              if (String(field.id) === e.target.id) {
                                return {
                                  ...field,
                                  options: e.target.value.split(","),
                                };
                              } else return field;
                            }),
                          }));
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
        <div className="border-y p-2 mt-2">
          <div className="flex gap-2">
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
          <div className="flex gap-6 items-center">
            {["textarea", "text", "radio", "multi-select", "dropdown"].map(
              (fieldType, idx) => {
                return (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      onChange={(e) => {
                        console.log(e.target.value);
                        setNewFieldType(e.target.value);
                      }}
                      type="radio"
                      name={"fieldType"}
                      value={fieldType}
                    />
                    <label htmlFor={fieldType}>{fieldType}</label>
                  </div>
                );
              }
            )}
          </div>
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
  } else return <NotFound />;
}

export default Form;
