import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:9090/api/students", () => {
    return HttpResponse.json([
      {
        name: "Phil Bobbins",
        email: "PhilBobbins@email.com",
        dateOfBirth: "02/12/2012",
        entryYear: 2023,
      },
      {
        name: "Kyran Rascal",
        email: "krascal@gmail.com",
        dateOfBirth: "02/04/2013",
        entryYear: 2024,
      },
    ]);
  }),
];
