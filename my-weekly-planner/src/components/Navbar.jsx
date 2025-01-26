import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink> 
        <NavLink to="/schedule">Schedule</NavLink> 
        <NavLink to="/allergens">Allergens</NavLink> 
        <NavLink to="/about">About</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
