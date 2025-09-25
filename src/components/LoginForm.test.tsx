import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import AuthProvider from "../contexts/AuthContext";
import { MemoryRouter } from "react-router-dom";

test("renders login button", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>
  );
  expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
});
