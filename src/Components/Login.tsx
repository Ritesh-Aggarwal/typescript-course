import React, { useState } from "react";
import { login } from "../utils/apiUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [errors, setErrors] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const validationErrors = validateForm(form);
    // setErrors(validationErrors);
    // if (Object.keys(validationErrors).length === 0) {
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      window.location.replace("/");
      // navigate(`/`);
    } catch (err) {
      console.log(err);
    }
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              id="username"
              className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
              value={username}
              onChange={(e) => {
                setUsername((p) => e.target.value);
              }}
            />
            {/* <div className="text-red-500">{errors && errors.title}</div> */}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="outline text-black outline-slate-200 focus:ring-2 rounded-md px-2 flex-1 text-lg"
              value={password}
              onChange={(e) => {
                setPassword((p) => e.target.value);
              }}
            />
            {/* <div className="text-red-500">{errors && errors.description}</div> */}
          </div>
        </div>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
