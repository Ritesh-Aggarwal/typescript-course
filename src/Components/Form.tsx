import React, { useEffect, useReducer, useRef, useState } from "react";
import { defaultFormsData } from "../constants";
import LabelledInput from "./LabelledInput";
import { Link } from "raviger";
import { Field, FormData } from "../types/formTypes";
import NotFound from "./NotFound";

const initialState: (id: number) => FormData = (id) => {
  var JSONdata = localStorage.getItem("formsData");
  const data = JSONdata ? JSON.parse(JSONdata) : defaultFormsData;
  localStorage.setItem("formsData", JSON.stringify(data));
  const form = data.filter((item: FormData) => {
    return item.id === id;
  })[0];
  return form;
};

type AddFieldAction = {
  type: "ADD_FIELD";
  payload: {
    kind: string;
    name: string;
  };
};

type RemoveFieldAction = {
  type: "REMOVE_FIELD";
  payload: {
    id: number;
  };
};

type UpdateTitleAction = {
  type: "UPDATE_TITLE";
  payload: {
    value: string;
  };
};

type AddOptionAction = {
  type: "ADD_FIELD_OPTIONS";
  payload: {
    value: string;
    id: string;
  };
};

type UpdateNameAction = {
  type: "UPDATE_NAME";
  payload: {
    value: string;
    id: string;
  };
};

type FormDataAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateTitleAction
  | AddOptionAction
  | UpdateNameAction;

const reducer = (state: FormData, action: FormDataAction) => {
  switch (action.type) {
    case "ADD_FIELD": {
      var obj: any = {
        id: Number(new Date()),
        name: action.payload.name,
        kind: action.payload.kind,
        value: "",
      };
      if (["radio", "multi-select", "dropdown"].includes(action.payload.kind)) {
        obj = { ...obj, options: [] };
      }
      return {
        ...state,
        formFields: [...state.formFields, obj],
      };
    }
    case "REMOVE_FIELD": {
      return {
        ...state,
        formFields: state.formFields.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    case "UPDATE_TITLE": {
      return {
        ...state,
        title: action.payload.value,
      };
    }
    case "ADD_FIELD_OPTIONS": {
      return {
        ...state,
        formFields: state.formFields.map((field: Field) => {
          if (String(field.id) === action.payload.id) {
            return {
              ...field,
              options: action.payload.value.split(","),
            };
          } else return field;
        }),
      };
    }
    case "UPDATE_NAME": {
      return {
        ...state,
        formFields: state.formFields.map((field: Field) => {
          if (String(field.id) === action.payload.id) {
            return { ...field, name: action.payload.value };
          } else return field;
        }),
      };
    }
  }
};

function Form(props: { formId: string }) {
  const [newField, setNewField] = useState<string>("");
  const [newFieldType, setNewFieldType] = useState<string>("text");
  const [state, dispatch] = useReducer(reducer, null, () =>
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
    dispatch({
      type: "ADD_FIELD",
      payload: { kind: newFieldType, name: newField },
    });
    setNewField("");
    setNewFieldType("");
  };

  const removeField = (id: number) => {
    dispatch({ type: "REMOVE_FIELD", payload: { id: id } });
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewField(e.target.value);
  };

  const handleChangeInput = (e: { target: { id: string; value: any } }) => {
    dispatch({
      type: "UPDATE_NAME",
      payload: { id: e.target.id, value: e.target.value },
    });
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
            dispatch({
              type: "UPDATE_TITLE",
              payload: { value: e.target.value },
            });
          }}
          className="outline text-black  outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg my-2"
          type="text"
        />
        {state.formFields.map((field: Field, idx: number) => {
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
                    {field.options.length > 0 &&
                    field.options[0] !== "" ? null : (
                      <div className="bg-red-200 text-red-500 px-4 py-2">
                        Add atleast one option
                      </div>
                    )}
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
                          dispatch({
                            type: "ADD_FIELD_OPTIONS",
                            payload: { id: e.target.id, value: e.target.value },
                          });
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
            <select
              name="fieldType"
              id="fieldType"
              onChange={(e) => {
                setNewFieldType(e.target.value);
              }}
              className="focus:ring-2 rounded-md p-1 hover:cursor-pointer border"
            >
              {[
                { label: "Text", value: "text" },
                { label: "Textarea", value: "textarea" },
                { label: "Radio", value: "radio" },
                { label: "Dropdown", value: "dropdown" },
                { label: "Multi-select", value: "multi-select" },
              ].map((fieldType, idx) => {
                return (
                  <option
                    key={idx}
                    value={fieldType.value}
                    className="flex gap-2 items-center"
                  >
                    {fieldType.label}
                  </option>
                );
              })}
            </select>
            <button
              onClick={addField}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            >
              Add Field
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(_) => saveForm(state)}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Save
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
