import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types";

interface AuthContextType {
  token: string | null;
  user: User | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;

  isAuthenticated: boolean;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [token, setToken] =
    useState<string | null>(null);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (savedToken && savedUser) {

      try {

        setToken(savedToken);

        setUser(
          JSON.parse(savedUser)
        );

      } catch (error) {

        console.error(
          "Failed to restore user:",
          error
        );

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );
      }

    }

  }, []);

  const login = (
    newToken: string,
    newUser: User
  ) => {

    localStorage.setItem(
      "token",
      newToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    setToken(newToken);

    setUser(newUser);

    console.log(
      "Logged in user:",
      newUser
    );
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setToken(null);

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;
};