import { render, screen } from "@testing-library/react";
import DataTable from "../StudentDataTable";
import { columns } from "@/app/columns";
import type { Student } from "@/types/Student";

jest.mock("next/navigation", () => require("next-router-mock"));

const assertStudentInfo = (student: Student) => {
  const screenDate = new Date(student.date_of_birth)
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");

  const IdElement = screen.getByText(student.id.toString());
  const nameElement = screen.getByText(student.name);
  const emailElement = screen.getByText(student.email);
  const dobElement = screen.getByText(screenDate);
  const entryYearElement = screen.getByText(student.entry_year.toString());

  expect(IdElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(dobElement).toBeInTheDocument();
  expect(entryYearElement).toBeInTheDocument();
};

describe("StudentDataTable", () => {
  describe("Render", () => {
    it("should render a single student", () => {
      const mockSingleStudent = [
        {
          id: 1,
          name: "Phil Bobbins",
          email: "PhilBobbins@email.com",
          date_of_birth: "2012-02-12T00:00:00.000Z",
          entry_year: 2023,
        },
      ];

      render(<DataTable columns={columns} data={mockSingleStudent} />);

      assertStudentInfo(mockSingleStudent[0]);
    });

    it("renders multiple students properly", () => {
      const mockStudents = [
        {
          id: 1,
          name: "Phil Bobbins",
          email: "PhilBobbins@email.com",
          date_of_birth: "2012-02-12T00:00:00.000Z",
          entry_year: 2023,
        },
        {
          id: 2,
          name: "Alice Smith",
          email: "alice@example.com",
          date_of_birth: "1995-08-20T00:00:00.000Z",
          entry_year: 2021,
        },
        {
          id: 3,
          name: "John Doe",
          email: "john.doe@example.com",
          date_of_birth: "1990-03-15T00:00:00.000Z",
          entry_year: 2020,
        },
      ];

      render(<DataTable columns={columns} data={mockStudents} />);

      mockStudents.forEach((student) => {
        assertStudentInfo(student);
      });
    });

    it("renders properly with empty data", () => {
      render(<DataTable columns={columns} data={[]} />);
      const emptyMessage = screen.getByText("No data available");
      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
