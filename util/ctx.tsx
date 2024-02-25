import React, { useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface AuthContextProps {
  signIn: (user: string) => void;
  signOut: () => void;
  session?: any | null;
  isLoading: boolean;
  theme: ThemeType;
  toggleTheme: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
  signIn: (user: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  theme: "light",
  toggleTheme: () => null,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [[isLoading, session], setSession] = useStorageState("session");
  const [theme, setTheme] = React.useState<ThemeType>(colorScheme as ThemeType);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <AuthContext.Provider
      value={{
        signIn: (user: string) => {
          setSession(user);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        theme,
        toggleTheme,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
