import { navigate } from "raviger";
import React, { useState } from "react";
import { Errors, Form, validateForm } from "../types/formTypes";
import { createForm } from "../utils/apiUtils";

function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });
  const [errors, setErrors] = useState<Errors<Form>>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/form/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="font-semibold text-xl border-b pb-2">Create new form</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              id="title"
              className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
              value={form.title}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  title: e.target.value,
                }));
              }}
            />
            <div className="text-red-500">{errors && errors.title}</div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
              value={form.description}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  description: e.target.value,
                }));
              }}
            />
            <div className="text-red-500">{errors && errors.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="is_public" className="font-semibold">
              Is public
            </label>
            <input
              type="checkbox"
              id="is_public"
              checked={form.is_public}
              onChange={(e) => {
                setForm((p) => ({
                  ...p,
                  is_public: e.target.checked,
                }));
              }}
            />
          </div>
        </div>
        <button
          className="mt-2 bg-red-500 hover:bg-red-700 text-white rounded-lg px-4 py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
