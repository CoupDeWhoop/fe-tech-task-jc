import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

  it("should display edit student modal", async () => {
    render(await Home());

    // used data-testid attribute
    const editButton = screen.getByTestId(`edit-button-1`); // Replace `1` with the actual student ID you're testing
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeVisible();
    });

    const dialogTitle = screen.getByText(/edit student/i);
    expect(dialogTitle).toBeVisible();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/entry year/i)).toBeInTheDocument();
  });

  it("should display the correct message when data empty", async () => {
    server.use(
      http.get("http://localhost:9090/api/students", () => {
        return HttpResponse.json({
          students: [],
        });
      })
    );

    const emptyMessage = screen.getByText(/no data available/i);
    expect(emptyMessage).toBeVisible();
  });
});
