import { Link } from "raviger";
import React from "react";
import Copy from "../Copy";
import { FormItem } from "../types/formTypes";
import { User } from "../types/userTypes";

type Props = {
  form: FormItem;
  handleDeleteCB: (id: number) => void;
  currentUser: User;
};

export const ListForm = ({ form, handleDeleteCB, currentUser }: Props) => {
  return (
    <div className="p-4 border-t-2 flex justify-between items-center">
      <li className="font-semibold text-lg">{form.title}</li>
      <div className="text-gray-500"></div>
      <div className="flex gap-2">
        <Link
          href={`/form/${form.id}/submissions`}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          View Submissions
        </Link>
        <Link
          href={`/preview/${form.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Take quiz
        </Link>
        {currentUser.username !== "" && (
          <Link
            href={`/form/${form.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            Edit
          </Link>
        )}
        <button
          onClick={() => {
            handleDeleteCB(form.id);
          }}
          className="bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2"
        >
          Delete
        </button>
        <Copy formId={form.id} />
      </div>
    </div>
  );
};
