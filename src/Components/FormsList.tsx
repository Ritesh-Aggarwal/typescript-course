import React from "react";
import { FormData } from "./Form";

interface Props {
  formList: FormData[];
  openFormCB: (id: number) => void;
  deleteFormCB: (id: number) => void;
  goHomeCB: () => void;
}

function FormsList(props: Props) {
  return (
    <div className="mt-2">
      {props.formList.map((form) => {
        return (
          <div
            className="p-4 border-t-2 flex justify-between items-center"
            key={form.id}
          >
            <div className="font-semibold text-lg">{form.title}</div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  props.openFormCB(form.id);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  props.deleteFormCB(form.id);
                }}
                className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={props.goHomeCB}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
      >
        Home
      </button>
    </div>
  );
}

export default FormsList;
