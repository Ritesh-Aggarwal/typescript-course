import React, { useEffect, useState } from "react";
import { FormField } from "../types/formTypes";
import { getSubmissions } from "../utils/apiUtils";
import { formFields } from "./FormComponent/EditForm";
import { Answer } from "./PreviewForm/PreviewForm";

type Props = {
  formId: string;
};

const fetchSubmits = async (
  formId: string,
  setSubmitsCB: (value: Result[]) => void
) => {
  try {
    const data = await getSubmissions(formId);
    setSubmitsCB(data.results);
    console.log(data.results);
  } catch (err) {
    console.error(err);
  }
};

type Result = {
  answers: Omit<Answer, "question">[];
  id: number;
};

function Submission({ formId }: Props) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [submits, setSubmits] = useState<Result[]>([]);
  useEffect(() => {
    fetchSubmits(formId, setSubmits);
    formFields(formId, setFields);
  }, [formId]);
  return (
    <div>
      {submits &&
        submits.map((i, index) => {
          return (
            <div
              key={i.id}
              className="my-2 p-2 border hover:shadow-lg rounded-md cursor-pointer"
            >
              <div className="font-semibold text-lg">
                Submission {index + 1}
              </div>
              {i.answers.map((ans, idx) => {
                return (
                  <div className="" key={idx}>
                    <span className="font-medium">
                      {fields?.find((i) => i.id === ans.form_field)?.label} :{" "}
                    </span>
                    {ans.value}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default Submission;
