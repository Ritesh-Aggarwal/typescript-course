import { ActiveLink } from "raviger";
import React from "react";
import logo from "../logo.svg";

interface Props {
  // title: string;
}

function Header(props: Props) {
  return (
    <div className="flex border-b p-2">
      <img
        src={logo}
        className="w-12 animate-spin"
        style={{
          animation: "spin 2s linear infinite",
        }}
        alt="logo"
      />
      <div className="flex gap-4 ">
        {[
          { url: "/", name: "Home" },
          { url: "/about", name: "About" },
        ].map((i) => {
          return (
            <ActiveLink
              key={i.url}
              href={i.url}
              exactActiveClass="text-blue-400 border-b-2 border-blue-500"
            >
              {i.name}
            </ActiveLink>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
