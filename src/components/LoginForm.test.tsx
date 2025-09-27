import { render, screen } from "../../tests/test-utils";
import LoginForm from "./LoginForm";

describe("LoginForm UI", () => {
  it("renders the login button", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("renders inputs", () => {
    render(<LoginForm />);

    expect(
      screen.getByText(/Login with existing account/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Login:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });
});
