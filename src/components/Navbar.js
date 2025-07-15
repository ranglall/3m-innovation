import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/airquality">Air Quality</Link>
    </div>
  );
};
export default Navbar;