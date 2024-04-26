import Link from "next/link";

function Navbar() {
  return (
    <nav className="border-b pb-4">
      <h1>Student Dashboard</h1>
      <div className="flex justify-start gap-10 pl-1">
        <Link href="/">Home</Link>
        <Link href="/create">Add student</Link>
      </div>
    </nav>
  );
}

export default Navbar;
