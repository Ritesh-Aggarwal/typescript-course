import React from "react";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <>
      <div className="text-center text-xl my-4">Welcome to React app</div>
      <button
        onClick={props.openFormCB}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white  rounded-lg px-4 py-2"
      >
        Open Form
      </button>
    </>
  );
}
