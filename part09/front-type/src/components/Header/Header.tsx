interface headerProps {
  courseName: string;
}

function Header({ courseName }: headerProps) {
  return <h1>{courseName}</h1>;
}

export default Header;
