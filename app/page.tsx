import DataTable from "@/components/student-data-table";
import { Student, columns } from "./columns";

async function getStudents(): Promise<Student[]> {
  const res = await fetch("http://localhost:9090/api/students", {
    next: {
      revalidate: 0, // use 0 to opt out of cache
    },
  });
  const { students } = await res.json();
  return students;
}

export default async function Home() {
  const data = await getStudents();
  return (
    <main>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
