import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import AuthProvider from "../src/contexts/AuthContext";

export const AllTheProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <ThemeProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  </AuthProvider>
);
