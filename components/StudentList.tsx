interface Student {
  id: Number;
  name: String;
  email: String;
  date_of_birth: String;
  entry_year: Number;
}

async function getStudents() {
  const res = await fetch("http://localhost:9090/api/students");
  return res.json();
}

export default async function StudentList() {
  const { students } = await getStudents();
  return (
    <>
      {students.map((student: Student) => (
        <div key={String(student.id)}>
          <h3>{student.name}</h3>
        </div>
      ))}
    </>
  );
}
