import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <div className="font-sans">
      <nav class="flex items-end mt-[50px] justify-between">
        <img src={logo} class="h-[75px] w-[306px] ml-[146px]"></img>
        <div class="mr-[145px] flex gap-[60px]">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/allergens">Allergens</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
