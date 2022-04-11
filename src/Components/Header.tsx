import { ActiveLink } from "raviger";
import React, { useEffect } from "react";
import logo from "../logo.svg";
import { User } from "../types/userTypes";

interface Props {
  currentUser: User;
}

function Header(props: Props) {
  useEffect(() => {}, [props.currentUser]);
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
      <div className="flex gap-4 items-center">
        {[
          { url: "/", page: "Home" },
          { url: "/about", page: "About" },
          ...(props.currentUser?.username !== ""
            ? [
                {
                  page: "Logout",
                  url: "/logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ url: "/login", page: "Login" }]),
        ].map((i) => {
          if (i.page === "Logout") {
            return (
              <button className="p-0" key={i.url} onClick={i.onClick}>
                {i.page}
              </button>
            );
          } else {
            return (
              <ActiveLink
                key={i.url}
                href={i.url}
                exactActiveClass="text-blue-400 border-b-2 border-blue-500"
              >
                {i.page}
              </ActiveLink>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Header;
