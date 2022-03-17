import React from "react";

interface Props {
  children: React.ReactNode;
}

function AppContainer(props: Props) {
  return (
    <div className="flex h-screen bg-gray-200 items-center">
      {props.children}
    </div>
  );
}

export default AppContainer;
