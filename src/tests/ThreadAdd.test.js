import { render, screen } from "@testing-library/react";
import SavedThread from "./SavedThread";
import ThreadAdd from "./ThreadAdd";

it("should render upon user log in"),
  () => {
    if (user) render(<ThreadAdd />);
  };

it("should render the saved thread element on submit", () => {
  const button = screen.getByRole("button");
  fireEvent.click(button);
  render(<SavedThread />);
});

it("should have a disabled attribute unless `reddit.com/r/` is in the input field", () => {
  const buttonElement = screen.getByRole("button");
  expect(buttonElement.disabled).toBe(true);
});
