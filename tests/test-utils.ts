import { render } from "@testing-library/react";
import { AllTheProviders } from "./AllTheProviders";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };