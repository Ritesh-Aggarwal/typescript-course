import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { User } from "./types/userTypes";
import { me } from "./utils/apiUtils";

export const getCurrentUser = async (setCurrentUser: (value: User) => void) => {
  const user = await me();
  setCurrentUser(user);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
    password: null,
  });
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return <AppRouter currentUser={currentUser} />;
}

export default App;
