import React, { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lighttTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function UseTheme() {
  return useContext(ThemeContext);
}
