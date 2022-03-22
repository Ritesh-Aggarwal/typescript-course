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
