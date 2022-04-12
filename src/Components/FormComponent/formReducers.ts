import { Field, FormData } from "../../types/formTypes";
import { getFormFields } from "../../utils/apiUtils";
import { FormDataAction } from "./formActionTypes";
const formFields = async (id: string, setFieldsCB: (value: any) => void) => {};
export const reducer = (state: FormData, action: FormDataAction) => {
  switch (action.type) {
    case "ADD_FIELD": {
      var obj: Field = {
        id: Number(new Date()),
        name: action.payload.name,
        kind: action.payload.kind,
        value: "",
      } as Field;
      if (["radio", "multi-select", "dropdown"].includes(action.payload.kind)) {
        obj = { ...obj, options: [] } as Field;
      }
      return state.formFields
        ? {
            ...state,
            formFields: [...state.formFields, obj],
          }
        : state;
    }
    case "REMOVE_FIELD": {
      return {
        ...state,
        formFields:
          state.formFields &&
          state.formFields.filter((item) => item.id !== action.payload.id),
      };
    }
    case "UPDATE_TITLE": {
      return {
        ...state,
        title: action.payload.value,
      };
    }
    case "UPDATE_FIELD_OPTIONS": {
      return {
        ...state,
        formFields:
          state.formFields &&
          state.formFields.map((field: Field) => {
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
        formFields:
          state.formFields &&
          state.formFields.map((field: Field) => {
            if (String(field.id) === action.payload.id) {
              return { ...field, name: action.payload.value };
            } else return field;
          }),
      };
    }
  }
};
