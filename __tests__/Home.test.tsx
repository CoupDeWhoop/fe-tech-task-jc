import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

describe("Home", () => {
  it("should render the ", async () => {
    render(<Navbar />);

    const heading = screen.getByRole("heading", { level: 1 });

    // Assert that the fetched data is rendered
    expect(heading).toBeInTheDocument();
  });
});
