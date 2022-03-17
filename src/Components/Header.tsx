import React from "react";
import logo from "../logo.svg";

interface Props {
  title: string;
}

function Header(props: Props) {
  return (
    <div className="flex">
      <img
        src={logo}
        className="w-12 animate-spin"
        style={{
          animation: "spin 2s linear infinite",
        }}
        alt="logo"
      />
      <h1 className="text-center text-xl flex-1">{props.title}</h1>
    </div>
  );
}

export default Header;
