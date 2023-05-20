import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

//

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        const response = await api.get("/user");
        setUser(response.data);
      } else {
        setUser(storageUser);
      }
    };
    loadingStorageData();
  }, []);

  const signIn = async ({ email, password }) => {
    await api
      .post("/auth", {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", response.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
        setUser(null);
        localStorage.removeItem("@Auth:token");
        localStorage.removeItem("@Auth:user");
      });
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
