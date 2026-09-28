import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">SkillTracker</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;