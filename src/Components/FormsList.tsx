import React, { useState } from "react";
import { FormData } from "../types/formTypes";
import { defaultFormsData, formData } from "../constants";
import { Link, navigate, useQueryParams } from "raviger";

interface Props {}

const initialState: () => FormData[] = () => {
  const data = localStorage.getItem("formsData");
  const result = data ? JSON.parse(data) : defaultFormsData;
  localStorage.setItem("formsData", JSON.stringify(result));
  return result;
};

function FormsList(props: Props) {
  const [list, setList] = useState(initialState);
  const [{ search }] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const openForm = (id: number) => {
    navigate(`/form/${id}`);
  };

  const newForm = () => {
    const newForm = { ...formData, id: Number(new Date()) };
    const d: string | null = localStorage.getItem("formsData");
    var data: FormData[] = d ? JSON.parse(d) : [];
    data = [...data, newForm];
    setList(data);
    localStorage.setItem("formsData", JSON.stringify(data));
    openForm(newForm.id);
  };

  const deleteForm = (id: number) => {
    const JSONdata = localStorage.getItem("formsData");
    let data: FormData[] = JSONdata ? JSON.parse(JSONdata) : [];
    data = data.filter((form: FormData) => {
      return form.id !== id;
    });
    localStorage.setItem("formsData", JSON.stringify(data));
    setList(data);
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <form action="/" method="GET">
            <input
              className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 text-lg"
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              name="search"
              value={searchString}
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          onClick={newForm}
        >
          + New Form
        </button>
      </div>
      {list
        .filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .map((form) => {
          return (
            <div
              className="p-4 border-t-2 flex justify-between items-center"
              key={form.id}
            >
              <div className="font-semibold text-lg">{form.title}</div>
              <div className="text-gray-500">
                {form.formFields.length} Questions
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/preview/${form.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                >
                  Take quiz
                </Link>
                <button
                  onClick={() => {
                    openForm(form.id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteForm(form.id);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FormsList;
