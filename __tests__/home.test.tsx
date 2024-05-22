import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import nock from "nock";

beforeEach(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

describe("Home", () => {
  it("should render the Home page", async () => {
    nock("http://localhost:9090/")
      .get("/api/students/")
      .reply(
        200,
        {
          students: [
            {
              id: 1,
              name: "Phil Bobbins",
              email: "PhilBobbins@email.com",
              date_of_birth: "2012-12-02T00:00:00.000Z",
              entry_year: 2023,
            },
            {
              id: 2,
              name: "Kyran Rascal",
              email: "krascal@gmail.com",
              date_of_birth: "2013-04-01T23:00:00.000Z",
              entry_year: 2024,
            },
          ],
        },
        { "Access-Control-Allow-Origin": "*" }
      );
    render(await Home()); // ARRANGE

    const heading = screen.getByRole("heading", { level: 1 }); // ACT

    expect(heading).toBeInTheDocument(); // ASSERT
  });
});
