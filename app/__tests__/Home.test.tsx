import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

describe("Home", () => {
  it("should render the ", async () => {
    render(<Navbar />); // ARRANGE

    const heading = screen.getByRole("heading", { level: 1 }); // ACT

    expect(heading).toBeInTheDocument(); // ASSERT
  });
});
