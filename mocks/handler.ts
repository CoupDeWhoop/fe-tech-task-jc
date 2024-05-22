import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:9090/api/students", () => {
    return HttpResponse.json({
      students: [
        {
          id: 1,
          name: "Phil Bobbins",
          email: "PhilBobbins@email.com",
          date_of_birth: "2012-12-02T00:00:00.000Z",
          entry_year: 2022,
        },
        {
          id: 2,
          name: "Kyran Rascal",
          email: "krascal@gmail.com",
          date_of_birth: "2013-04-01T23:00:00.000Z",
          entry_year: 2024,
        },
      ],
    });
  }),
];
