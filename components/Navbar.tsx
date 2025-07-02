"use client";
import { useState } from "react";
import { ThemeChanger } from "./ThemeToggle";
import ResponsiveNavbarMenu from "./ResponsiveNavbarMenu";
import { navbarMenuItems, privateRoutes } from "@/constants";
import NavbarMenuItem from "./NavbarMenuItem";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react"; // Import useSession and signOut
import LogoutButton from "./LogoutButton";
import LogoComponent from "./LogoComponent";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession(); // Get session data and status

  return (
    <nav className="bg-navy text-neutral border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between md:justify-start space-x-8 items-center">
          <LogoComponent />

          <div className="hidden md:flex space-x-8 items-center w-full">
            {navbarMenuItems
              .filter((item) => session || !privateRoutes.includes(item.href))
              .map((item: { title: string; href: string }, i: number) => (
                <NavbarMenuItem key={i} href={item.href} title={item.title} />
              ))}
            <div className="flex flex-row items-center space-x-4 justify-end w-full rounded-lg ">
              {status === "loading" ? (
                <div>Loading...</div>
              ) : session ? (
                <>
                  <NavbarMenuItem
                    href={`/profile/${session.user.id}`}
                    title={session.user?.name || "Profile"}
                  />
                  <LogoutButton />
                </>
              ) : (
                <>
                  <NavbarMenuItem href={"/login"} title={"Giriş yap"} />
                  <NavbarMenuItem href={"/register"} title={"Üye ol"} />
                </>
              )}
              <ThemeChanger />
            </div>
          </div>

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
            <ResponsiveNavbarMenu
              setMenuOpen={setMenuOpen}
              menuOpen={menuOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
