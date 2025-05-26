import React from "react";
import { ThemeChanger } from "./ThemeToggle";

const ResponsiveNavbarMenu = () => {
  return (
    <div className="md:hidden px-4 pb-4 space-y-2">
      <a href="#" className="block hover:text-sky transition">
        Home
      </a>
      <a href="#" className="block hover:text-sky transition">
        About
      </a>
      <a href="#" className="block hover:text-sky transition">
        Services
      </a>
      <a href="#" className="block hover:text-sky transition">
        Contact
      </a>
      <a href="#" className="block hover:text-sky transition">
        Login
      </a>
      <a href="#" className="block hover:text-sky transition">
        Register
      </a>
      <ThemeChanger />
    </div>
  );
};

export default ResponsiveNavbarMenu;
