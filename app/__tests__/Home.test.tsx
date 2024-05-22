import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../page";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Home", () => {
  it("should render the table headers", async () => {
    render(await Home()); // ARRANGE

    // ACT
    // const heading = screen.getByRole("heading", { level: 1 });
    const header1 = screen.getByText(/id/i);
    const header2 = screen.getByText(/name/i);
    const header3 = screen.getByText(/date of birth/i);

    // ASSERT
    // expect(heading).toBeInTheDocument();
    expect(header1).toBeVisible();
    expect(header2).toBeVisible();
    expect(header3).toBeVisible();
  });

  it("should display the correct message when data empty", async () => {
    server.use(
      http.get("http://localhost:9090/api/students", () => {
        return HttpResponse.json(
          {
            students: [],
          },
          { status: 200 }
        );
      })
    );

    const emptyMessage = screen.getByText(/no data available/i);
    expect(emptyMessage).toBeVisible();
  });
});
