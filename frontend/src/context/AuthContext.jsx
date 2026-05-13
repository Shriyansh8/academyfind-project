import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "academyUser"
        )
      ) || null
    );

  const login = (data) => {
    localStorage.setItem(
      "academyUser",
      JSON.stringify(data)
    );

    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem(
      "academyUser"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);