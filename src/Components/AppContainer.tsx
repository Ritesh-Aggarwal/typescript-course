import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

function AppContainer(props: Props) {
  const [state, setState] = useState(false);
  const trigger = () => {
    setState((p) => !p);
  };
  return (
    <div
      className={`flex h-screen ${state ? "text-white" : ""}  items-center`}
      style={
        state
          ? {
              backgroundImage: 'url("/bg-image.jpg")',
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <button
        onClick={trigger}
        className="hover:bg-yellow-200 hover:text-black rounded-bl-lg pl-1 pb-1 absolute top-0 right-0"
      >
        {state ? "Go back" : "Beautify✨"}
      </button>
      {props.children}
    </div>
  );
}

export default AppContainer;
