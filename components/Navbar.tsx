"use client";
import { useState, useEffect } from "react";
import { ThemeChanger } from "./ThemeToggle";
import ResponsiveNavbarMenu from "./ResponsiveNavbarMenu";
import { navbarMenuItems } from "@/constants";
import NavbarMenuItem from "./NavbarMenuItem";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-navy text-neutral border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between md:justify-start jus space-x-8 items-center">
          <div className="text-xl font-bold ">MyBrand</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center w-full">
            {navbarMenuItems.map(
              (item: { title: string; href: string }, i: number) => (
                <NavbarMenuItem key={i} href={item.href} title={item.title} />
              )
            )}
            <div className="flex flex-row items-center space-x-4 justify-end w-full rounded-lg ">
              <NavbarMenuItem href={"/login"} title={"Login"} />
              <NavbarMenuItem href={"/register"} title={"Register"} />
              <ThemeChanger />
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-neutral focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu - with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <ResponsiveNavbarMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
