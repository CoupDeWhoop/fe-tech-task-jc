import DataTable from "@/components/StudentDataTable/StudentDataTable";
import { columns } from "./columns";
import { Student } from "@/types/Student";

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
      <h1>Hello</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
