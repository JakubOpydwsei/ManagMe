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

  it("prompt alert when form name and description inputs are empty", async () => {
    render(<ProjectAdd />);
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await user.click(screen.getByRole("button", { name: /Add project/i }));
    expect(alertMock).toBeCalledWith("Please fill in all fields");

    alertMock.mockRestore();
  });

  it("prompt alert when form name input is empty", async () => {
    render(<ProjectAdd />);
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await user.type(screen.getByLabelText("Description:"), "test Description");

    await user.click(screen.getByRole("button", { name: /Add project/i }));
    expect(alertMock).toBeCalledWith("Please fill in all fields");

    alertMock.mockRestore();
  });

  it("prompt alert when form description input is empty", async () => {
    render(<ProjectAdd />);
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await user.type(screen.getByLabelText("Name:"), "test Name");

    await user.click(screen.getByRole("button", { name: /Add project/i }));
    expect(alertMock).toBeCalledWith("Please fill in all fields");

    alertMock.mockRestore();
  });

  it("do not prompt alert when form is filled", async () => {
    render(<ProjectAdd />);
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    await user.type(screen.getByLabelText("Name:"), "test Name");
    await user.type(screen.getByLabelText("Description:"), "test Description");

    await user.click(screen.getByRole("button", { name: /Add project/i }));
    expect(alertMock).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});
