import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";

it("should render when user is not logged in"),
  () => {
    if (!user) render(<LoginPage />);
  };
