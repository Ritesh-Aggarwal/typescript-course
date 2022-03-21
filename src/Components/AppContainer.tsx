import React from "react";

interface Props {
  children: React.ReactNode;
}

function AppContainer(props: Props) {
  return (
    <div className="flex h-screen items-center bg-gray-100">
      <div className=" w-3/5 p-4 mx-auto bg-white shadow-lg rounded-xl">
        {props.children}
      </div>
    </div>
  );
}

export default AppContainer;
