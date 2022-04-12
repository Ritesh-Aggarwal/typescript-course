import React, { useEffect, useState } from "react";
import { FormField, FormItem } from "../../types/formTypes";
import {
  addFormFields,
  getForm,
  getFormFields,
  removeFormField,
  saveFormField,
} from "../../utils/apiUtils";
import LabelledInput from "../LabelledInput";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from "react-beautiful-dnd";

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

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 8px 0`,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});
// const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
// background: isDraggingOver ? "lightgrey" : "",
// });

const reorder = (
  list: FormField[],
  startIndex: number,
  endIndex: number
): FormField[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const items: FormField[] = reorder(
      fields,
      result.source.index,
      result.destination.index
    );

    setFields(items);
  };

  return (
    <div>
      <div className="font-semibold text-2xl">{form?.title}</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot): JSX.Element => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={`item-${field.id}`}
                  index={index}
                >
                  {(provided, snapshot): JSX.Element => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="shadow-lg rounded-md p-4"
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="my-1">
                        <LabelledInput
                          index={index}
                          field={field}
                          value={field.label}
                          handleChangeCB={(e: {
                            target: { id: string; value: string };
                          }) => {
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
                          deleteFieldCB={deleteField}
                          handleOptionChangeCB={handleOptionChange}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
