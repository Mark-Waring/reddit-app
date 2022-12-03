import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import SavedThreads from "./SavedThreads";

const savedThreads = useContext(AppContext);

it("should map through each saved thread and display them"),
  () => {
    const text1 = screen.getByText("ago");
    expect(text1).toBeInTheDocument();
    render(<SavedThreads />);
  };
