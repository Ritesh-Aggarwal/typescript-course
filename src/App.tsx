import React from "react";
import logo from "./logo.svg";
import AppContainer from "./AppContainer";

function App() {
  return (
    <AppContainer>
      <div className="flex w-max p-4 mx-auto bg-white shadow-lg rounded-xl">
        <img
          src={logo}
          className="w-12"
          style={{
            animation: "spin 2s linear infinite",
          }}
          alt="logo"
        />
        <h1 className="text-center text-xl">Level 1 milestone</h1>
      </div>
    </AppContainer>
  );
}

export default App;
