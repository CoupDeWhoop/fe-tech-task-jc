import type { Student } from "@/types/Student";

export default async function fetchStudents() {
  try {
    const res = await fetch("http://localhost:9090/api/students");

    const students: Student[] = await res.json();

    return students;
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    return [];
  }
}
