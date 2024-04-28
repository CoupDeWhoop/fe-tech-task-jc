import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

import { Pencil, Trash } from "lucide-react";

interface Student {
  id: Number;
  name: String;
  email: String;
  date_of_birth: Date;
  entry_year: Number;
}

async function getStudents(): Promise<Student[]> {
  const res = await fetch("http://localhost:9090/api/students", {
    next: {
      revalidate: 0, // use 0 to opt out of cache
    },
  });
  const { students } = await res.json();
  return students;
}

interface StudentTableProps {
  students: Student[];
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Table>
      <TableCaption>A list of registered students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead className="text-right">Entry Year</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => {
          const dateString = new Date(student.date_of_birth)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(" ");
          return (
            <TableRow key={String(student.id)}>
              <TableCell className="font-medium">
                {String(student.id)}
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{dateString}</TableCell>
              <TableCell className="text-right">
                {String(student.entry_year)}
              </TableCell>
              <TableCell className="pl-4 pr-0">
                <Button variant={"ghost"} size={"sm"} className="text-gray-400">
                  <Pencil />
                </Button>
              </TableCell>
              <TableCell className="pl-0">
                <Button variant={"ghost"} size={"sm"} className="text-red-500">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}></TableCell>
          <TableCell className="text-right">Total Students:</TableCell>
          <TableCell className="text-right">{students.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default async function StudentList() {
  const students = await getStudents();
  return (
    <div className="flex justify-center">
      <div>
        <StudentTable students={students} />
      </div>
    </div>
  );
}
