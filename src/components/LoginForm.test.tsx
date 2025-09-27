import { render, screen } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
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

describe("LoginForm integration", () => {
  it("allows typing into login and password inputs", async () => {
    render(<LoginForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Login:/i), "login");
    await user.type(screen.getByLabelText(/Password:/i), "password");
    expect(screen.getByLabelText(/Password:/i)).toHaveValue("password");
    expect(screen.getByLabelText(/Login:/i)).toHaveValue("login");
  });
});
