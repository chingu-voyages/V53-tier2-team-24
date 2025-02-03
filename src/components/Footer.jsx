import React from "react";
import github from "../images/github.svg";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-button text-md text-white mt-10 m-4 bg-black">
      © 2024 Team 24 of Voyage 53
      <a href="https://github.com/chingu-voyages/v53-tier2-team-24" target="_blank">
        <img
          src={github}
          className="w-6 h-6 ml-2"
          alt="GitHub Logo"
        ></img>
      </a>
    </footer>
  );
};

export default Footer;
