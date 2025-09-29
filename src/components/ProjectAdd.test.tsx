import userEvent from "@testing-library/user-event";
import { render, screen } from "../../tests/test-utils";
import ProjectAdd from "./ProjectAdd";

describe("ProjectAdd component tests", () => {
  vi.mock("../contexts/ApiContext", () => ({
    useApi: () => ({
      projectApi: {
        add: vi.fn(),
      },
    }),
  }));

  it("renders form elements", () => {
    render(<ProjectAdd />);

    expect(
      screen.getByRole("heading", { name: /Add project/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add project/i })
    ).toBeInTheDocument();
  });

  it("allows typing into name and description", async () => {
    render(<ProjectAdd />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Name:"), "test Name");
    await user.type(screen.getByLabelText("Description:"), "test Description");

    expect(screen.getByLabelText("Name:")).toHaveValue("test Name");
    expect(screen.getByLabelText("Description:")).toHaveValue(
      "test Description"
    );
  });
});
