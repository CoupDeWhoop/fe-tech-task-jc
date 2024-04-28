"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EditStudent } from "@/components/EditStudent";

export type Student = {
  id: Number;
  name: String;
  email: String;
  date_of_birth: Date;
  entry_year: Number;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("date_of_birth"))
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ");

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "entry_year",
    header: () => <div className="text-center">Entry Year</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("entry_year")}</div>
    ),
  },
  {
    id: "edit",
    cell: ({ row }) => <EditStudent student={row.original} />,
  },
];
