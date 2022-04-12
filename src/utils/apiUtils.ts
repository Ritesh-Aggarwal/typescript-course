import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type ReqMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Field = { label: string; kind: string; options?: string[]; value: string };

export const request = async (
  endpoint: string,
  method: ReqMethod = "GET",
  data: any = {}
) => {
  let url, payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  //basic auth
  //   const auth = "Basic " + window.btoa("Ritesh:3d9Kr6BvxDAMLUn");

  //token auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: payload ? payload : null,
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const createForm = (form: Form) => {
  return request("forms/", "POST", form);
};

export const listForms = (params: { limit?: number; offset?: number } = {}) => {
  return request("forms/", "GET", params);
};

export const getForm = (id: string) => {
  return request("forms/" + id + "/", "GET");
};
export const getFormFields = (id: string) => {
  return request("forms/" + id + "/fields/", "GET");
};

export const addFormFields = (id: string, field: Field) => {
  return request("forms/" + id + "/fields/", "POST", field);
};

export const removeFormField = (formId: string, id: string) => {
  return request("forms/" + formId + "/fields/" + id + "/", "DELETE");
};
export const deleteForm = (formId: string) => {
  return request("forms/" + formId + "/", "DELETE");
};

export const saveFormField = (formId: string, id: string, field: Field) => {
  return request("forms/" + formId + "/fields/" + id + "/", "PATCH", field);
};

export const submitAnswers = (
  formId: string,
  answers: { form_field: number; value: string }[]
) => {
  return request("forms/" + formId + "/submission/", "POST", {
    answers: answers,
  });
};
export const getSubmissions = (formId: string) => {
  return request("forms/" + formId + "/submission/", "GET");
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET");
};
