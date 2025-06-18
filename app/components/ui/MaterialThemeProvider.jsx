"use client"
import { ThemeProvider } from "@material-tailwind/react";

const MaterialThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MaterialThemeProvider;
