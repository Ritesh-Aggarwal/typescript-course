import React, { useEffect, useState } from "react";
import { FormField, FormItem } from "../../types/formTypes";
import {
  addFormFields,
  getForm,
  getFormFields,
  removeFormField,
  saveFormField,
} from "../../utils/apiUtils";
// import { debounce } from "ts-debounce";

type Props = {
  formId: string;
};
export const formFields = async (
  id: string,
  setFieldsCB: (value: any) => void
) => {
  try {
    const data = await getFormFields(id);
    setFieldsCB(data.results);
  } catch (err) {
    console.error(err);
  }
};

const fetchForm = async (id: string, setFormCB: (value: FormItem) => void) => {
  try {
    const data = await getForm(id);
    setFormCB(data);
  } catch (err) {
    console.error(err);
  }
};
const saveField = async (formId: string, id: string, field: FormField) => {
  try {
    const f = {
      label: field.label,
      kind: field.kind,
      options: field.options,
      value: field.value,
    };
    saveFormField(formId, id, f);
  } catch (err) {
    console.error(err);
  }
};
function EditForm({ formId }: Props) {
  // const saveFieldDebounce = debounce(saveField, 1000);
  const [form, setForm] = useState<FormItem>();
  const [fields, setFields] = useState<FormField[]>([]);
  const [newField, setNewField] = useState<{ label: string; kind: string }>({
    label: "",
    kind: "TEXT",
  });
  useEffect(() => {
    formFields(formId, setFields);
    fetchForm(formId, setForm);
  }, [formId]);

  const saveAllFields = () => {
    fields.forEach((field) => {
      saveField(formId, String(field.id), field);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveAllFields();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const handleChange = (e: { target: { value: string } }) => {
    setNewField((p) => ({ ...p, label: e.target.value }));
  };
  const handleOptionChange = (e: { target: { id: string; value: string } }) => {
    setFields((p) => {
      return [
        ...p.map((field) => {
          if (String(field.id) === e.target.id) {
            return {
              ...field,
              options: e.target.value.split(","),
            };
          } else return field;
        }),
      ];
    });
  };

  const addField = async () => {
    const data = await addFormFields(formId, {
      label: newField.label,
      kind: newField.kind,
      options: [],
      value: "",
    });
    if (data) {
      setFields((p) => {
        return [
          {
            id: data.id,
            label: newField.label,
            kind: newField.kind,
            options: [],
            value: "",
          } as FormField,
          ...p,
        ];
      });
    }
  };

  const deleteField = (id: number) => {
    removeFormField(formId, String(id));
    setFields((p) => {
      return [...p.filter((item) => item.id !== id)];
    });
  };

  return (
    <div>
      <div className="font-semibold text-2xl">{form?.title}</div>
      <div className="">
        {fields?.map((field, idx) => {
          return (
            <div className="my-1" key={field.id}>
              <div className="font-medium">Question {idx + 1}</div>
              <div className="flex gap-2 my-2">
                <input
                  className="outline outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
                  type="text"
                  id={String(field.id)}
                  name={field.label}
                  value={field.label}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFields((p) => {
                      return [
                        ...p.map((field) => {
                          if (String(field.id) === e.target.id) {
                            return { ...field, label: e.target.value };
                          } else return field;
                        }),
                      ];
                    });
                  }}
                ></input>
                <button
                  onClick={(_) => {
                    deleteField(field.id);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white  rounded-lg px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              {field.kind === "DROPDOWN" || field.kind === "RADIO" ? (
                <div className="ml-6">
                  {field.options.length > 0 &&
                  field.options[0] !== "" ? null : (
                    <div className="bg-red-200 text-red-500 px-4 py-2">
                      Add atleast one option
                    </div>
                  )}
                  <div className="">Add field options (seperated by ",") :</div>
                  <div className="my-2">
                    <input
                      className="outline w-full text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
                      type="text"
                      id={String(field.id)}
                      name={field.label}
                      value={field.options.join(",")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleOptionChange(e);
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="border-y p-2 mt-2">
        <div className="flex gap-2">
          <input
            value={newField.label}
            onChange={handleChange}
            className="outline text-black  outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg my-2"
            type="text"
          />
          <select
            name="fieldType"
            id="fieldType"
            onChange={(e) => {
              setNewField((p) => ({ ...p, kind: e.target.value }));
            }}
            className="focus:ring-2 rounded-md p-1 hover:cursor-pointer border"
          >
            {[
              { label: "Text", value: "TEXT" },
              { label: "Radio", value: "RADIO" },
              { label: "Dropdown", value: "DROPDOWN" },
              { label: "Generic", value: "GENERIC" },
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
            onClick={() => {
              addField();
              setNewField((p) => ({ ...p, label: "" }));
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Add Field
          </button>
        </div>
      </div>
      <button
        onClick={(_) => saveAllFields()}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
      >
        Save
      </button>
    </div>
  );
}

export default EditForm;
