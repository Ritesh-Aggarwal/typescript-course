import React, { useEffect, useState } from "react";
import { MultiSelectField } from "../types/formTypes";

export interface Option {
  value: string;
  label: string;
}

function MultiSelectInput(props: {
  field: MultiSelectField;
  value: string;
  handleChangeCB: (e: { target: { id: string; value: any } }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(() => {
    if (props.value === "") return [];
    else return props.value.split(",");
  });

  useEffect(() => {
    props.handleChangeCB({
      target: { id: String(props.field.id), value: selected.join(",") },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <div
        onClick={() => {
          setOpen((p) => !p);
        }}
        className={`border p-2 flex justify-between items-center hover:cursor-pointer ${
          open ? "border-b-0  rounded-t-md" : "rounded-md"
        } `}
      >
        {selected.length > 0 ? (
          <div className="">{props.value}</div>
        ) : (
          <div className="">Select {props.field.name} </div>
        )}
        <div className="h-4 w-4">
          <img
            alt="v"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg=="
          />
        </div>
      </div>
      {open && (
        <div className={`border  rounded-b-md px-2`}>
          <div className="flex gap-2 items-center  hover:bg-blue-300 hover:cursor-pointer">
            <input
              type="checkbox"
              name={"Select all"}
              value={""}
              className="p-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelected(props.field.options);
                } else setSelected([]);
              }}
            />
            <label>Select all</label>
          </div>
          {props.field.options.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex gap-2 items-center hover:bg-blue-300 hover:cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={String(props.field.id)}
                  name={item}
                  value={item}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    if (e.target.checked) {
                      setSelected((p) => {
                        return [...p, e.target.value];
                      });
                    } else {
                      setSelected((p) => {
                        return [...p.filter((i) => i !== item)];
                      });
                    }
                  }}
                  checked={selected.includes(item)}
                  className="p-2"
                />
                <label>{item}</label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default MultiSelectInput;
