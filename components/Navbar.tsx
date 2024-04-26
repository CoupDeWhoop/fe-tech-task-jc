import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <h1>Student Dashboard</h1>
      <Link href="/">Home</Link>
      <Link href="/create">Add student</Link>
    </nav>
  );
}

export default Navbar;
