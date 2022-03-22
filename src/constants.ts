import { Field, FormData } from "./types/formTypes";

export const formFields: Field[] = [
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
