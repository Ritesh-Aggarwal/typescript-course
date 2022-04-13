import { Field, FormData } from "./types/formTypes";

export const formFields: Field[] = [
  {
    id: 1,
    name: "First Name",
    placeholder: "John",
    kind: "text",
    type: "text",
    value: "",
  },
  {
    id: 2,
    kind: "text",
    name: "Last",
    placeholder: "Doe",
    type: "text",
    value: "",
  },
  {
    id: 3,
    kind: "text",
    name: "Email",
    type: "email",
    placeholder: "john.doe@gmail.com",
    value: "",
  },
  {
    id: 4,
    kind: "text",
    name: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    id: 5,
    kind: "dropdown",
    name: "Status",
    options: ["Employed", "Unempolyed", "Self-Employed"],
    value: "",
  },
  {
    id: 6,
    kind: "radio",
    name: "Gender",
    options: ["Male", "Female", "Non-binary"],
    value: "",
  },
  {
    id: 7,
    kind: "textarea",
    name: "Address",
    value: "",
  },
  {
    id: 8,
    kind: "multi-select",
    name: "Favourites",
    value: "",
    options: ["Chocolate", "Strawberry", "Vanilla"],
  },
];

export const formData: FormData = {
  id: 1,
  title: "Untitled form",
  formFields: formFields,
};

export const defaultFormsData: FormData[] = [
  {
    id: 1,
    title: "Untitled form",
    formFields: formFields,
  },
  {
    id: 2,
    title: "Untitled form 2",
    formFields: formFields,
  },
];
