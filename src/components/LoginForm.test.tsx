import { render, screen } from "../../tests/test-utils";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders the LoginForm component", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });
});
