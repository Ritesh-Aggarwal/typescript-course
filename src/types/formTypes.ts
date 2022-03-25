type textFieldType = "text" | "email" | "date";

export type TextField = {
  kind: "text";
  id: number;
  name: string;
  type: textFieldType;
  placeholder?: string;
  value: string;
};

export type DropdownField = {
  kind: "dropdown";
  id: number;
  name: string;
  options: string[];
  value: string;
};

export type RadioField = {
  kind: "radio";
  id: number;
  name: string;
  options: string[];
  value: string;
};

export type TextAreaField = {
  kind: "textarea";
  id: number;
  name: string;
  value: string;
  rows?: number;
  cols?: number;
};

export type MultiSelectField = {
  kind: "multi-select";
  id: number;
  name: string;
  value: string;
  options: string[];
};

export type Field =
  | TextField
  | DropdownField
  | RadioField
  | TextAreaField
  | MultiSelectField;

export interface FormData {
  id: number;
  title: string;
  formFields: Field[];
}
