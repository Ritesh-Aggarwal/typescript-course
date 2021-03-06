import React, { useEffect, useState } from "react";
import { FormItem } from "../types/formTypes";
import { useQueryParams } from "raviger";
import { deleteForm, listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import Paginator from "./common/Paginator";
import { getCurrentUser } from "../App";
import { User } from "../types/userTypes";
import { ListForm } from "./ListForm";

const LazyModal = React.lazy(() => import("./common/Modal"));
const LazyForm = React.lazy(() => import("./CreateForm"));
const limit: number = 2;
const fetchForms = async (
  setListCB: (value: FormItem[]) => void,
  page: number
) => {
  try {
    const data: Pagination<FormItem> = await listForms({
      limit: limit,
      offset: (page - 1) * limit,
    });
    setListCB(data.results);
  } catch (err) {
    console.error(err);
  }
};

const fetchFormsCount = async (setCountCB: (value: number) => void) => {
  try {
    const data: Pagination<FormItem> = await listForms({});
    setCountCB(data.count);
  } catch (err) {
    console.error(err);
  }
};

const deleteFormById = async (id: number) => {
  try {
    const data = await deleteForm(String(id));
    return data;
  } catch (err) {
    console.error(err);
  }
};

function FormsList() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    password: null,
  });
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  const [{ search, page }] = useQueryParams();
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [searchString, setSearchString] = useState("");
  const [list, setList] = useState<FormItem[]>([]);
  useEffect(() => {
    fetchForms(setList, page);
  }, [page]);

  useEffect(() => {
    fetchFormsCount(setCount);
  }, []);

  const handleDelete = (id: number) => {
    deleteFormById(id);
    setList((p) => {
      if (p) {
        return [...p.filter((item) => item.id !== id)];
      }
      return p;
    });
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
        {currentUser.username !== "" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            + New Form
          </button>
        )}
      </div>
      {list
        .filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .map((form) => {
          return (
            <div key={form.id}>
              <ListForm
                form={form}
                handleDeleteCB={handleDelete}
                currentUser={currentUser}
              />
            </div>
          );
        })}
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyModal
          open={open}
          closeCB={() => {
            setOpen(false);
          }}
        >
          <LazyForm />
        </LazyModal>
      </React.Suspense>
      <Paginator page={Number(page ? page : 1)} total={count} limit={limit} />
    </div>
  );
}

export default FormsList;
